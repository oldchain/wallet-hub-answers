/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name,
 * last name, and phone number and there should be a submit button. 
 * 
 * Once the submit button is pressed, the information should be displayed in a list below 
 * (automatically sorted by last name) along with all the previous information that was entered.
 * 
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated 
 * with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

function PhoneBookForm({ addEntryToPhoneBook }) {

    const [inputs, setInputs] = useState({
        userFirstname: "",
        userLastname: "",
        userPhone: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        addEntryToPhoneBook(inputs);
      }
    
    return (
        <form onSubmit={e => { handleSubmit(e) }} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                value={inputs.userFirstname || ""} 
                onChange={handleChange}                    />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                value={inputs.userLastname || ""} 
                onChange={handleChange}                    />
 
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                value={inputs.userPhone || ""} 
                onChange={handleChange}                    />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable(props) {

    const [contactsInfo, setContactsInfo] = useState([]);

    useEffect(() => {
        setContactsInfo(props.contacts);
      }, [props]); // 👈️ add props as dependencies

      const compare = ( a, b ) => {
        if ( a.userLastname < b.userLastname ){
          return -1;
        }
        if ( a.userLastname > b.userLastname ){
          return 1;
        }
        return 0;
      }
            
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    contactsInfo.sort(compare).map((contact, index) => (
                        <tr key={index} >
                            <td style={style.tableCell}>{contact.userFirstname}</td>
                            <td style={style.tableCell}>{contact.userLastname}</td>
                            <td style={style.tableCell}>{contact.userPhone}</td>
                        </tr>
            
                    )) 
                }
            </tbody>
        </table>
    );
}

function Application(props) {
    
    const [contacts, setContacts] = useState([]);

    const callbackFunction = (childData) => {
            const contactsList = [...contacts, childData]
            setContacts(contactsList);    
    }

    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={callbackFunction} />
            <InformationTable contacts={contacts} />
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);