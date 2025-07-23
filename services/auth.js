import supabase from "./supabase"

export default class Auth {
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log(data)
    console.log(error)
    return data
  }

  async signIn(email, password) {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log(data)
    console.log(error)
    return data
  }

  async logout() {
    let { error } = await supabase.auth.signOut()
    return true
  }
}