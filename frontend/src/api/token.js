let _token = localStorage.getItem('token') || ''
export const token = {
  set: (t) => {
    _token = t || ''
    if (t) {
      localStorage.setItem('token', t)
    } else {
      localStorage.removeItem('token')
    }
  },
  clear: () => {
    _token = ''
    localStorage.removeItem('token')
  },
  get: () => _token,
}
