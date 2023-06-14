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
    computed: {
        formData() {
            return this.$route.query;
        }
    },
    methods: {
        goBack() {
            // 使用 router.go(-1) 方法回到前一頁
            this.$router.go(-1);
            // 從 localStorage 中獲取之前儲存的 formData
            const savedFormData = localStorage.getItem('formData');

            if (savedFormData) {
            this.formData = JSON.parse(savedFormData);
            }
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
        },
        changeString(){
            this.formData.options1 = this.formData.options1.join(",");
            this.formData.options2 = this.formData.options2.join(",");
            this.formData.options3 = this.formData.options3.join(",");
            this.formData.options4 = this.formData.options4.join(",");
            this.formData.options5 = this.formData.options5.join(",");
        },
        addAnswer(){
            let body = {
                "answer_list":[{
                    "formId": this.formId,
                    "name": this.formData.name,
                    "phone": this.formData.phone,
                    "email": this.formData.email,
                    "age": this.formData.age,
                    "gender": this.formData.gender,
                    "ans1": this.formData.options1,
                    "ans2": this.formData.options2,
                    "ans3": this.formData.options3,
                    "ans4": this.formData.options4,
                    "ans5": this.formData.options5
                }]
            }
            fetch("http://localhost:8080/add_answer", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.message);
                if(data.message === "感謝填寫"){
                    this.$router.push('/')
                    // 清除已填写的记录
                    localStorage.removeItem('formData');
                }
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
        // 執行將陣列轉回字串
        this.changeString();
    },
}
</script>

<template>
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="all-area">
        <h1 class="title">{{ title }}</h1>
        <p><i class="fa-solid fa-circle-exclamation"></i> 請再次確認以下填寫資訊</p>

        <div class="form-area">
            <form action="">

                <div class="name">
                    <label for="">姓名（必填）</label>
                    <input type="text" readonly :value="formData.name">
                </div>

                <div class="phone">
                    <label for="">手機（必填）</label>
                    <input type="text" readonly :value="formData.phone">
                </div>

                <div class="email">
                    <label for="">E-mail（必填）</label>
                    <input type="text" readonly :value="formData.email">
                </div>

                <div class="age">
                    <label for="">年齡（必填）</label>
                    <input type="text" readonly :value="formData.age">
                </div>

                <div class="gender">
                    <label for="gender">性別（必填）</label>
                    <input type="text" readonly :value="formData.gender">
                </div>

                <div class="q1" v-if="Q1">
                    <label for="">{{ Q1 }} （必填）</label>
                    <input type="text" readonly :value="formData.options1">
                </div>

                <div class="q2" v-if="Q2">
                    <label for="">{{ Q2 }} （必填）</label>
                    <input type="text" readonly :value="formData.options2">
                </div>

                <div class="q3" v-if="Q3">
                    <label for="">{{ Q3 }} （必填）</label>
                    <input type="text" readonly :value="formData.options3">
                </div>

                <div class="q4" v-if="Q4">
                    <label for="">{{ Q4 }} （選填）</label>
                    <input type="text" readonly :value="formData.options4">
                </div>

                <div class="q5" v-if="Q5">
                    <label for="">{{ Q5 }} （選填）</label>
                    <input type="text" readonly :value="formData.options5">
                </div>
            </form>
        </div>

        <div class="btn-area">
            <button type="button" class="cancelBtn" @click="goBack">回到上一頁</button>
            <button type="button" class="enterBtn" @click="addAnswer">確認送出</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.all-area{
    padding: 20px;

    .title{
        padding: 20px 50px;
    }
    p{
        padding: 0 25px;
        color: rgb(100, 28, 28);
    }
    .form-area{

        margin-top: 60px;

        label{
            display: block;
            margin: 25px 0 0 30px;
        }
        input{
            color: rgb(97, 95, 95);
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

