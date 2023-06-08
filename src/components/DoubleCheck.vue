<script>
export default {
    components: {

    },
    data(){
        return {
            gender: '',
            animalArr: [],
            formId: null,
            title: null,
            startDay: null,
            endDay: null,
            Q1: null,
            Q2: null,
            Q3: null,
            Q4: null,
            Q5: null,
        }
    },
    methods: {
        goBack() {
            // 使用 router.go(-1) 方法回到前一頁
            this.$router.go(-1);
        },
        getId(){
            let body = {
                "formId": this.formId
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
                // console.log(data);
                this.title = data.form.title;
                this.startDay = data.form.startDay;
                this.endDay = data.form.endDay;
            })
            .catch(err => {
                console.log(err)
            })
        },
        getForm(){
            let body = {
                "formId": this.formId
            }
            fetch("http://localhost:8080/join_form_id", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                this.Q1 = data.question.q1;
                this.Q2 = data.question.q2;
                this.Q3 = data.question.q3;
                this.Q4 = data.question.q4;
                this.Q5 = data.question.q5;
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        // 獲取路由參數 formId
        this.formId = this.$route.params.formId;
        this.getId();
        // 執行 getForm
        this.getForm();
    },
}
</script>

<template>
    <div class="all-area">
        <h1 class="title">{{ title }}</h1>
        <p>請再次確認以下填寫資訊</p>

        <div class="form-area">
            <form action="">

                <div class="name">
                    <label for="">姓名（必填）</label>
                    <input type="text">
                </div>

                <div class="phone">
                    <label for="">手機（必填）</label>
                    <input type="text">
                </div>

                <div class="email">
                    <label for="">E-mail（必填）</label>
                    <input type="text">
                </div>

                <div class="age">
                    <label for="">年齡（必填）</label>
                    <input type="text">
                </div>

                <div class="gender">
                    <label for="gender">性別（必填）</label>
                    <input type="text">
                </div>

                <div class="q1" v-if="Q1">
                    <label for="">{{ Q1 }} （必填）</label>
                    <input type="text">
                </div>

                <div class="q2" v-if="Q2">
                    <label for="">{{ Q2 }} （必填）</label>
                    <input type="text">
                </div>

                <div class="q3" v-if="Q3">
                    <label for="">{{ Q3 }} （必填）</label>
                    <input type="text">
                </div>

                <div class="q4" v-if="Q4">
                    <label for="">{{ Q4 }} （必填）</label>
                    <input type="text">
                </div>

                <div class="q5" v-if="Q5">
                    <label for="">{{ Q5 }} （必填）</label>
                    <input type="text">
                </div>
            </form>
        </div>

        <div class="btn-area">
            <button type="button" class="cancelBtn" @click="goBack">回到上一頁</button>
            <button type="button" class="enterBtn">確認送出</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.all-area{
    padding: 20px;

    .title{
        padding: 20px 150px;
    }
    p{
        padding: 0 125px;
    }
    .form-area{

        margin-top: 60px;

        label{
            display: block;
            margin: 25px 0 0 30px;
        }
        input{
            margin: 10px 0 0 30px;
            // margin-top: 30px;
            height: 40px;
            width: 60%;
            border: 0;
            border-bottom: 2px solid rgba(0,0,0,.1);
            outline: none;
            cursor: default;
        }
    }

    .btn-area{
        padding: 30px;
        .cancelBtn{
            margin-right: 30px;
            border-radius: 5px;
            background: white;
            color: rgb(40, 49, 74);

            &:hover{
                background: rgb(40, 49, 74);
                color: white;
            }
        }
        .enterBtn{
            border-radius: 5px;
            background: white;
            color: rgb(40, 49, 74);

            &:hover{
                background: rgb(40, 49, 74);
                color: white;
            }
        }
    }
}
</style>

