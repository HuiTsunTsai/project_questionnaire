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
        // 執行 getId
        this.getId();
        // 執行 getForm
        this.getForm();
    },

}
</script>

<template>
    <div class="all-area">
        <h1>{{ title }}</h1>
        <p>表單編號：{{ formId }}</p>
        <span>填寫時間：</span>
        <span>{{ startDay }} ~ {{ endDay }}</span>

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
                    <input type="number">
                </div>

                <div class="gender">
                    <label for="gender">性別（必填）</label>
                    <!-- <label for="male"> -->
                    <input type="radio" id="male" value="male" v-model="gender" name="gender">男性
                    <!-- <label for="female"> -->
                    <input type="radio" id="female" value="female" v-model="gender">女性
                </div>

                <div class="q1" v-if="Q1">
                    <label for="">{{ Q1 }}（必填）</label>
                    <input type="checkbox" id="dog" value="dog" name="animal" v-model="animalArr">dog
                    <input type="checkbox" id="cat" value="cat" name="animal" v-model="animalArr">cat
                    <input type="checkbox" id="tiger" value="tiger" name="animal" v-model="animalArr">tiger
                </div>

                <div class="q2" v-if="Q2">
                    <label for="">{{ Q2 }}（必填）</label>
                    <input type="checkbox" id="dog" value="dog" name="animal" v-model="animalArr">dog
                    <input type="checkbox" id="cat" value="cat" name="animal" v-model="animalArr">cat
                    <input type="checkbox" id="tiger" value="tiger" name="animal" v-model="animalArr">tiger
                </div>

                <div class="q3" v-if="Q3">
                    <label for="">{{ Q3 }}（必填）</label>
                    <input type="checkbox" id="dog" value="dog" name="animal" v-model="animalArr">dog
                    <input type="checkbox" id="cat" value="cat" name="animal" v-model="animalArr">cat
                    <input type="checkbox" id="tiger" value="tiger" name="animal" v-model="animalArr">tiger
                </div>

                <div class="q4" v-if="Q4">
                    <label for="">{{ Q4 }}（必填）</label>
                    <input type="checkbox" id="dog" value="dog" name="animal" v-model="animalArr">dog
                    <input type="checkbox" id="cat" value="cat" name="animal" v-model="animalArr">cat
                    <input type="checkbox" id="tiger" value="tiger" name="animal" v-model="animalArr">tiger
                </div>

                <div class="q5" v-if="Q5">
                    <label for="">{{ Q5 }}（必填）</label>
                    <input type="checkbox" id="dog" value="dog" name="animal" v-model="animalArr">dog
                    <input type="checkbox" id="cat" value="cat" name="animal" v-model="animalArr">cat
                    <input type="checkbox" id="tiger" value="tiger" name="animal" v-model="animalArr">tiger
                </div>
            </form>
        </div>

        <div class="btn-area">
            <RouterLink to="/"> <button type="button" class="cancelBtn">取消</button></RouterLink>
            
            <RouterLink :to="'/double-check/' + formId"><button type="button" class="enterBtn">送出</button></RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.all-area{
    padding: 20px;

    h1{
        margin: 30px 0;
    }

    span{
        font-size: 15px;
    }
    .form-area{

        label{
            display: block;
            margin: 25px 0 0 10px;
        }
        input{
            margin: 8px 0 0 10px;
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

