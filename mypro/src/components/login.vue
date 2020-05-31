<template>
<div class="login_container">
    <div class="login_box">
        <div class="avator_box">
            <img src="../assets/logo.png" alt="">
        </div>
        <el-form ref="form" label-width="0px" class="login_form">
            <el-form-item>
                <el-input prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input prefix-icon="iconfont icon-3702mima"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary">登录</el-button>
                <el-button type="info">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avator_box {
        width: 130px;
        height: 130px;
        text-align: center;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #dddddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeeeee;
        }
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
