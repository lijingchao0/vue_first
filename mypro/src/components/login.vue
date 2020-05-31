<template>
<div class="login_container">
    <div class="login_box">
        <div class="avator_box">
            <img src="../assets/logo.png" alt="">
        </div>
        <el-form ref="loginform" :model="loginform" :rules="loginformrules" label-width="0px" class="login_form">
            <el-form-item prop="username">
                <el-input prefix-icon="iconfont icon-user" v-model="loginform.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="iconfont icon-3702mima" v-model="loginform.password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="submitForm()">登录</el-button>
                <el-button type="info" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            loginform: {
                username: '',
                password: '',
            },
            loginformrules: {
                username: [{
                        required: true,
                        message: '请输入登录名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在3到10个字符之间',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在6到15个字符之间',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.loginform.validate(async (valid) => {
                if (valid) {
                    const {
                        data: res
                    } = await this.$http.post('login', this.loginform);
                    this.$message.success('登录成功');
                    window.sessionStorage.setItem('token', res.data.token);
                    this.$router.push('/home');
                } else {
                    this.$message.error('登陆失败');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.loginform.resetFields();
        }
    }
}
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

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
