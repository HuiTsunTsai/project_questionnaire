<script>
export default {
    components: {
    },
    data(){
        return {
            // gender: '',
            // animalArr: [],
            formId: null,
            title: null,
            startDay: null,
            endDay: null,
            Q1: null,
            Q2: null,
            Q3: null,
            Q4: null,
            Q5: null,
            Q1_options: [],
            Q2_options: [],
            Q3_options: [],
            Q4_options: [],
            Q5_options: [],

            formData: {
                name: '',
                phone: '',
                email: '',
                age: '',
                gender: '',
                options1: [],
                options2: [],
                options3: [],
                options4: [],
                options5: [],
            }
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
        },
        getOptions(){
            let body = {
                "formId": this.formId
            }
            fetch("http://localhost:8080/get_options", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.Q1_options = data.options.q1Options.split(",").map(item => item.trim());
                this.Q2_options = data.options.q2Options.split(",").map(item => item.trim());
                this.Q3_options = data.options.q3Options.split(",").map(item => item.trim());
                this.Q4_options = data.options.q4Options.split(",").map(item => item.trim());
                this.Q5_options = data.options.q5Options.split(",").map(item => item.trim());

            })
            .catch(err => {
                console.log(err)
            })
        },
        saveInfo(){
            let body = {
                "name": this.formData.name,
                "phone": this.formData.phone,
                "email": this.formData.email,
                "age": this.formData.age,
                "gender": this.formData.gender,
                "ans1": this.formData.options1.join(","),
                "ans2": this.formData.options2.join(","),
                "ans3": this.formData.options3.join(","),
                // "ans4": this.formData.options4,
                // "ans5": this.formData.options5
                
            }
            fetch("http://localhost:8080/check", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(this.formData)
                console.log(data);
                alert(data.message);

                if(data.message === "前往確認頁面"){
                    localStorage.setItem('formData', JSON.stringify(this.formData));

                    this.$router.push({ path: "/double-check/" + this.formId, query: this.formData });
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        cancelForm() {
            // 清除已填写的记录
            localStorage.removeItem('formData');
        }
    },
    mounted() {
        // 獲取路由參數 formId
        this.formId = this.$route.params.formId;
        // 執行 getId
        this.getId();
        // 執行 getForm
        this.getForm();
        // 執行 getOptions
        this.getOptions();

        // 恢复之前保存的 formData
        const savedFormData = localStorage.getItem('formData');

        if (savedFormData) {
        this.formData = JSON.parse(savedFormData);
        }
    },

}
</script>

<template>
    <div class="all-area">
        <h1>{{ title }}</h1>
        <p class="words">表單編號： {{ formId }}</p>
        <span class="words">填寫時間： {{ startDay }} ~ {{ endDay }}</span>

        <div class="form-area">
            <form action="">

                <div class="name">
                    <label for="">姓名（必填）</label>
                    <input type="text" v-model="this.formData.name">
                </div>

                <div class="phone">
                    <label for="">手機（必填）</label>
                    <input type="text" v-model="this.formData.phone">
                </div>

                <div class="email">
                    <label for="">E-mail（必填）</label>
                    <input type="text" v-model="this.formData.email">
                </div>

                <div class="age">
                    <label for="">年齡（必填）</label>
                    <input type="number" v-model="this.formData.age">
                </div>

                <div class="gender">
                    <label for="gender">性別（必填）</label>
            
                    <input type="radio" id="male" value="男性" v-model="this.formData.gender" name="gender">男性

                    <input type="radio" id="female" value="女性" v-model="this.formData.gender">女性
                </div>

                <div class="q1" v-if="Q1">
                    <label for="">{{ Q1 }}（必填）</label>
                    <div class="options">
                        <label v-for="item in Q1_options" :key="item">
                            <input type="checkbox" v-model="formData.options1" :value="item">{{ item }}
                        </label>
                    </div>
                </div>

                <div class="q2" v-if="Q2">
                    <label for="">{{ Q2 }}（必填）</label>
                    <div class="options">
                        <label v-for="item in Q2_options" :key="item">
                            <input type="checkbox" v-model="formData.options2" :value="item">{{ item }}
                        </label>
                    </div>
                </div>

                <div class="q3" v-if="Q3">
                    <label for="">{{ Q3 }}（必填）</label>
                    <div class="options">
                        <label v-for="item in Q3_options" :key="item">
                            <input type="checkbox" v-model="formData.options3" :value="item">{{ item }}
                        </label>
                    </div>
                </div>

                <div class="q4" v-if="Q4">
                    <label for="">{{ Q4 }}（選填）</label>
                    <div class="options">
                        <label v-for="item in Q4_options" :key="item">
                            <input type="checkbox" v-model="formData.options4" :value="item">{{ item }}
                        </label>
                    </div>
                </div>

                <div class="q5" v-if="Q5">
                    <label for="">{{ Q5 }}（選填）</label>
                    <div class="options">
                        <label v-for="item in Q5_options" :key="item">
                            <input type="checkbox" v-model="formData.options5" :value="item">{{ item }}
                        </label>
                    </div>
                </div>
            </form>
        </div>

        <div class="btn-area">
            <RouterLink to="/">
                <button type="button" @click="cancelForm" class="cancelBtn">取消</button>
            </RouterLink>
            
                <button type="button" @click="saveInfo" class="enterBtn">送出</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.all-area{
    padding: 20px;

    h1{
        margin: 30px 50px;
    }
    .words{
        font-size: 15px;
        margin: 0 30px;
    }
    .form-area{
        margin-top: 40px;

        label{
            display: block;
            margin: 25px 0 0 30px;
        }
        input{
            margin: 10px 0 0 30px;
        }
        .options{
            display: flex;

            input{
                margin: 0;
            }
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

