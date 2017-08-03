export const SUBMIT_EMAIL = 'SUBMIT_EMAIL'
export const SHOW_EMAIL = 'SHOW_EMAIL'

export function submitEmail(email) {
  return {
    type: SUBMIT_EMAIL,
    email
  }
}
export function showEmailInput() {
  return {
    type: SHOW_EMAIL,
    show: true
  }
}
