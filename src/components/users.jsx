import React,{useState} from 'react';
import api from "../API"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        let newUsers = users.filter(f => f._id != userId.id);
        setUsers(newUsers);
    }
  
    const isPhraseChanged = (number) =>{
        debugger;
        const phraseChangeNumberArray = [2,3,4];
        const phraseNotChangeNumberArra = [12,13,14];
        const numberStr = number.toString();
        const Length = numberStr.length;
        const last = Number(numberStr[Length-1]); 

        if (Length === 1) {
            return phraseChangeNumberArray.some(s=> s === last);
        } else {
            const lastTwoNumber = Number(numberStr[Length-2] + numberStr[Length-1]); 
            return phraseChangeNumberArray.some(s=> s === last) && !phraseNotChangeNumberArra.some(s => s === lastTwoNumber);
        }
    }
    const renderPhrase = (number) => {
        if(number){
            // const isChange = phraseChangeNumberArray.some(s=> s === getLastNumber(number));
            if (isPhraseChanged(number)) {
                return `${number} человека тусанут с тобой сегодня`;
            }
            return `${number} человек тусанет с тобой сегодня`;
        }
        else{
            return `Никто с тобой не тусанет`;
        }
    }

    const getBageClasses = (number) => {
        let classes = "badge m-2 bg-"
        classes += number === 0 ? "danger" : "primary";
        return classes;
    }

    const getBageClassQuality = (qualityColor) => {
        let classes = "badge m-2 bg-"
        classes += qualityColor;
        return classes;
    }

    return (
    <>
        <span className={getBageClasses(users.length)}>{renderPhrase(users.length)} </span>
        <table className="table" style={{visibility: users.length ? 'visible' : 'hidden' }}>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Качества</th>
                    <th>Профессия</th>
                    <th>Встретился, раз</th>
                    <th>Оценка</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
        {users.map((user,index) =>{
            return (
                <tr key={user._id}>
                    <td scope="row">{user.name}</td>
                    <td>{user.qualities.map((quality,ind)=> {
                        return (
                            <span key={quality._id} className={getBageClassQuality(quality.color)}>{quality.name} </span>
                        )})}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td><button type="button"  onClick = {() => handleDelete({id: user._id})}   className="btn btn-danger">Delete</button></td>
                </tr>
            )
        })}
            </tbody>
        </table>

    </>
    );
}
 
export default Users;