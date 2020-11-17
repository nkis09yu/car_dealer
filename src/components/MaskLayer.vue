<template>
    <div id="mask"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    #mask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(#000, .6);
        z-index: 1500;
    }
</style>