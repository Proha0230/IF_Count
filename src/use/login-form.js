import {useField, useForm} from 'vee-validate'
import { useStore } from 'vuex'
import axios from 'axios'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

export function useLoginForm(){
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const store = useStore()
    const router = useRouter()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email',
    yup
    .string()
    .trim()
    .required('Пожалуйста введите email')
    .email('Необходимо ввести корректный email')
    )

    const MIN_LENGTH = 6
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
    yup
    .string()
    .trim()
    .required('Пожалуйста введите пароль')
    .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
    )

    const LoadingStore = async ()=>{
    try{
    const {data} = await axios.get(`https://if-count-default-rtdb.firebaseio.com/DataPlayer/${store.state.TokenID}.json`)
    store.state.Count = data.Count
    store.state.PerCount = data.PerCount
    store.state.arrayWithObjectUpgradesBtn = data.UpgradesBtn
    store.state.arrayWithObjectInvestBtn = data.InvestBtn
    store.state.InvestProcent = data.InvestProcent
    } catch(e){}
    }

    const LoginForm = handleSubmit( async dataInput => {
    try{
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
      const {data} = await axios.post(url, {...dataInput, returnSecureToken: true})
      store.state.TokenID = data.localId
      store.state.playerMail = data.email
      LoadingStore()
      router.push('/home')
      
    } catch(e){
      store.state.eMessage = e.response.data.error.message
    }
    })

    const RegistrForm = handleSubmit( async dataInput => {
    try{
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
      const {data} = await axios.post(url, {...dataInput, returnSecureToken: true})
      store.state.rMessage = data.email
      store.state.openRegistration = false
      
    } catch(e){
      store.state.eMessage = e.response.data.error.message
    }
    })


    return{email, password, eError, eBlur, pBlur, pError, LoginForm, isSubmitting, RegistrForm}
}