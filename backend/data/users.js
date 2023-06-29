import bcrypt from 'bcryptjs'
const users =[
    {
        name:'Admin',
        email:'admin@test.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true

    },
    {
        name:'Hardik',
        email:'Hardik@test.com',
        password:bcrypt.hashSync('123456',10),
        

    },
    {
        name:'john doe',
        email:'johndoe@test.com',
        password:bcrypt.hashSync('123456',10),

    }
]
export default users