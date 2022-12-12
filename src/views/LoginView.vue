<template>
    <!-- <div style="margin: 10px" /> -->
    <div v-loading="loading">
        <el-form ref="ruleFormRef" :rules="rules" label-position="left" label-width="70px" :model="formValue"
            style="max-width: 460px">
            <el-form-item label="账号：" prop="account">
                <el-input v-model="formValue.account" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="formValue.password" />
            </el-form-item>
            <el-form-item label="">
                <vue-recaptcha
                    @verify="captchaVerifyHandler($event)"
                />
            </el-form-item>
        </el-form>
    </div>
    <el-button color="#626aef" @click="loginHandler">登录！</el-button>
</template>
  
<script lang="ts">

import { reactive, ref, defineComponent } from 'vue'
import {login, LoginRequest} from "../api/account";
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { type } from 'os';
import {VueRecaptcha} from "vue3-recaptcha-v2";

export default defineComponent({
    components: {VueRecaptcha},
    methods: {
        captchaVerifyHandler(response: string) {
            this.captchaVerified = true,
            this.captchaToken = response
        },
        loginHandler() {
            this.loading=true;
            if(!this.ruleFormRef){
                ElMessage.closeAll();
                ElMessage.error("表单错误");
                this.loading=false;
                return;
            }
            this.ruleFormRef.validate((valid) => {
                if(!valid) {
                    ElMessage.closeAll();
                    ElMessage.error("请正确填写表单后再尝试登录");
                    this.loading=false;
                    return;
                }
                const loginRequest: LoginRequest = {
                    account: this.formValue.account,
                    password: this.formValue.password,
                    'captcha-token': this.captchaToken
                }
                login(loginRequest).then(()=> {
                    ElMessage.closeAll();
                    ElMessage.success("登录成功");
                    // this.$router.push('/');
                    location.reload();
                    this.loading=false;
                }).catch((err:Error) => {
                    ElMessage.closeAll()
                    ElMessage.error("登录失败 " + err.message);
                    this.loading=false;
                })
            })
        }
    },
    setup() {
        return {
            showMessageSuccess: (msg: string) => {
                ElMessage({
                    message: msg,
                    type: 'success',
                })
            },
            isLogin:ref(false),
            captchaVerified: ref(false),
            captchaToken: ref(''),
            formValue: ref({
                account: '',
                password: '',
            }),
            loading:ref(false),
            ruleFormRef: ref<FormInstance>(),
            rules: {
                account: {
                    required: true,
                    message: '请输入你的帐号'
                },
                password: {
                    required: true,
                    message: '请输入你的密码'
                }
            }
        }
    },
    mounted() {
        this.isLogin=localStorage.getItem('login')==='true';
        if(this.isLogin){
            this.$router.push('/profile');
        }
    },
})

</script>
  