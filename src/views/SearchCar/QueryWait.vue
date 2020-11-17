<template>
    <div>{{waittext}}</div>
</template>

<script>
export default {
    data() {
        return {
            sec: 10,
            waittext: '查询等待'
        }
    },
    mounted() {
        this.queryResult();
    },
    methods: {
        queryResult(){
            this._interval = setInterval(() => {
                if(this.sec <= 0) {
                    clearInterval(this._interval);
                    this.searchStatus();
                } else {
                    this.countDown();
                }
            }, 1000);
        },
        searchStatus() {
            this.$http({
                method: 'post',
                url: '/api/car_dealer_index.php?s=/Home/Report/SearchStatus',
                data: this.qs.stringify({
                    openid: localStorage.openid,
                    report_id: this.$route.query.report_id
                })
            })
            .then( res => {
                console.log(res.data)
                if(res.data.data.report_id != ''){
                    this.$router.push('/report?report_id='+res.data.data.report_id);
                } else {
                    this.$router.push('/searchcar');
                }
            })
        },
        countDown() {
            this.sec--;
            this.waittext = '查询等待(' + this.sec + ')';
        }
    }

}
</script>

<style>

</style>
