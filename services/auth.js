// import supabase from "./supabase"
import http from "./axios"

export default class Auth {
  async signUp(email, password, isCompany) {
    const { data, error } = await http.post('/users/create', {
      email,
      password,
      permission: isCompany ? 'COMPANY' : 'EMPLOYEE'
    })
    console.log(data)
    console.log('ERROR', error)
    return data
  }

  async signIn(email, password) {
    console.log('HTTP', http)
    console.log(email)
    console.log(password)
    let { data, error } = await http.post('/auth', {
      email,
      password,
    })
    console.log(data)
    console.log(error)
    return data
  }

  async logout() {
    let { error } = await http.get('/auth/logout')
    return true
  }
}