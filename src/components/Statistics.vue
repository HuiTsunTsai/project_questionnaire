<script>
export default{
    components: {
    },
    data(){
        return {
            formId: null,
            title: null
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
            })
            .catch(err => {
                console.log(err)
            })
        },
        createPieChart() {
            // 获取Canvas元素
            const canvas = this.$refs.pieChart;
            const ctx = canvas.getContext('2d');

            // 定义数据
            const data = {
            labels: ['Q1', 'Q2', 'Q3'],
            datasets: [{
                data: [30, 40, 20],
                backgroundColor: ['rgb(45, 49, 74)', 'rgb(73, 79, 115)', 'rgb(165, 173, 192)'],
                hoverBackgroundColor: ['rgb(247, 210, 110)', 'rgb(247, 210, 110)', 'rgb(247, 210, 110)']
            }]
            };

            // 创建圆饼图
            new Chart(ctx, {
            type: 'pie',
            data: data
            });
        }
    },
    mounted() {
        // 獲取路由參數 formId
        this.formId = this.$route.params.formId;
        // 執行getId抓取資料
        this.getId();
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = this.createPieChart;
        document.head.appendChild(script);

    }
}
</script>

<template>
    <div class="all-area">
        <h1>{{ title }}</h1>
        <div class="btn-area">
            <button class="btn">切換</button>
            <RouterLink to="/"><button class="btn">回首頁</button></RouterLink>
        </div>
        <div class="dataPic">
            <canvas ref="pieChart"></canvas>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .all-area{
        
        display: flex;
        flex-direction: column;
        align-items: center;

        h1{
            text-align: center;
            padding: 50px;
            font-size: 50px;
        }

        .btn-area{
            

            .btn{
            border-radius: 5px;
            color: rgb(40, 49, 74);
            // font-size: 2.0px;

                &:hover{
                    background: rgb(40, 49, 74);
                    color: white;
                }
            }
        }

        .dataPic{
            width: 400px;
            height: 400px;
            margin-top: 100px;
        }
    }
</style>