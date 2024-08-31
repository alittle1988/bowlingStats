import { Button } from "react-bootstrap"
import useFetch from "../Hooks/useFetch";
import { miyagi } from 'ldrs';

function Header() {
    const {get, post, put,remove, results, loading} = useFetch('http://localhost:3000')
    miyagi.register()
    const user = {
        firstName: 'Andrew',
        lastName: 'Little',
        id: 1,
        dateJoined: new Date().toDateString(),
        games: [],
        password: "password",
        userName: 'alittle1988'
    }
 

    function handleButtonClick() {
        //get('/users')
        //get(`/users/${user.userName}?password=${user.password}`)
        /*post('/users', {
            firstName: 'Melissa',
            lastName: 'Kahn'
        })*/
        //put(`/users/${user.id}`, user)
        remove(`/users/${user.id}`, user)
    }
    console.log(results)
  return (
    <div>
        <h1>Header</h1>
        <Button onClick={handleButtonClick}>Press me</Button>
        {loading ? <l-miyagi size="35" stroke="3.5" speed="0.9" color="red"></l-miyagi> : <div></div>}
        {results ? <div>{results.firstName}</div> : <div></div>}
    </div>
  )
}

export default Header