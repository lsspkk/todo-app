import { Account } from './accountController'

let data: Account[] = [
  {
    id: '1',
    username: 'admin',
    password: '$argon2i$v=19$m=4096,t=3,p=1$ccX3BH/TBXDEnA/2uMgKmw$/ihUuIUW+/FsL0kV5+NMumuBiKNAy+Y5b1LilXwnyXo',
    role: 'ADMIN',
  },
]

export const setAccounts = (newData) => (data = newData)

export { data as accounts }
