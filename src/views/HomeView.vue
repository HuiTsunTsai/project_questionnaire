<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  template: {

  },
  data(){
    return {
        searchTitle: null,
        tableData: null,
        startDate: null,
        endDate: null,
        // idIndex: null
    }
  },
  created(){
    this.getInfo();
  },
  methods: {
    getInfo(){
        let body = {
            "title" : this.searchTitle,
            "startDay" : this.startDate,
            "endDay" : this.endDate
        }
        fetch("http://localhost:8080/search_by_title", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.tableData = data.formList;

                if(data.message === "無此問卷"){
                    alert(data.message);
                }

                if(data.message === "無搜尋結果"){
                    alert(data.message);
                }

                // 對tableData按照時間開始降序排序
                this.tableData.sort((a, b) => {
                    if (a.startDay === b.startDay){
                        if(a.state === '未開始') return -1;
                        if(a.state === '填寫中' && b.state !== '未開始')return -1;
                        return 1;
                    } else {
                        return new Date(b.startDay) - new Date(a.startDay);
                    }
                });

            })
            .catch(err => {

            })
    },
    checkFormState(formId, next){
        // event.preventDefault(); // 停止默認路由跳轉行為
        let body = {
            "formId": formId
        }
        fetch("http://localhost:8080/get_id", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(formId);

                if(data.form.state === "已結束"){
                    alert("問卷填寫時間已過囉");
                    next(false);
                }
                else if(data.form.state === "未開始"){
                    // this.$router.replace("/");
                    alert("問卷未開放填寫");
                    next(false);
                }
                else{
                    next();
                }

            })
            .catch(err => {
                console.log(err);
            })
    }
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {

        // 偵測目標路由是否為填寫問卷頁面
        if (to.path.startsWith("/fillout")) {
            const formId = to.params.formId;
            // 檢查問卷狀態並決定是否停止路由跳轉
            this.checkFormState(formId, next);
        } 
        else {
            // 其他頁面正常跳轉
            next(); 
        }
    });
   },
}
</script>

<template>
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="title-area">
        <RouterLink to="/" class="title"><h1>問卷搜尋</h1></RouterLink>

        <div class="sarch-area">
            <!-- <p>問卷標題</p> -->
            <input type="text" placeholder="請輸入關鍵字" v-model="searchTitle">
            <button class="searchBtn" @click="getInfo"><i class="fa-solid fa-magnifying-glass"></i>搜尋</button> 
        </div>    

        <!-- 日期搜尋 -->
        <div class="time">
            <label for="dateFrom">開始時間</label>
            <input type="date" class="form-control" id="dateFrom" name="date" v-model="startDate">
            <label for="dateFrom">結束時間</label>
            <input type="date" class="form-control" id="dateUtil" name="date" v-model="endDate">
            <span v-if="endDate < startDate" class="error-message">時間錯誤</span>
        </div>

    </div>

    <div class="down-area">
        <table class="table table-success table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">填寫</th>
                <th scope="col">問卷標題</th>
                <th scope="col">狀態</th>
                <th scope="col">開始時間</th>
                <th scope="col">結束時間</th>
                <th scope="col">觀看統計</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                <th scope="row">{{ item.formId }}</th>
                <td><RouterLink :to="'/fillout/' + item.formId">
                    <button type="button" class="fillout" @click="checkFormState(item.formId)">填寫</button>
                </RouterLink></td>
                <td>{{ item.title }}</td>
                <td>{{ item.state }}</td>
                <td>{{ item.startDay }}</td>
                <td>{{ item.endDay }}</td>
                <td><RouterLink :to="'/statistics/' + item.formId">前往</RouterLink></td>
                </tr>
            </tbody>
            </table>

    </div>
</template>

<style lang="scss" scoped>

    .title-area{
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title{
            text-decoration: none;
            margin: 60px 0;
            color: #333;
        }

        .sarch-area{
            margin: 20px 0;

            p{
                font-size: 20px;
            }

            input{
                width: 300px;
                height: 30px;
                border-radius: 5px;
            }

            .searchBtn{
                // margin: 60px auto 50px auto;
                padding: 5px 20px;
                border-radius: 15px;
                border: none;
                background: #333;
                color: white;
                transition: 0.3s;
                margin-left: 10px;

                &:hover{
                    background: #555;
                }

                &:active{
                    scale: 0.95;
                }
            }
        }

        .time{
            label{
                margin: 10px 20px 0 20px;
            }
            .error-message{
                color: red;
            }
        }
    }

    .down-area{
        margin-top: 25px;
        display: flex;
        justify-content: center;
        padding: 20px 150px;

        .table{
            // border: 2px solid #648288;
            th{
                border: 2px solid #648288;
            }

            .fillout{
                border-radius: 5px;
                background: white;
                color: rgb(31, 59, 59);

                &:hover{
                    background: rgb(40, 49, 74);
                    color: white;
                }
            }
        }
    }
</style>