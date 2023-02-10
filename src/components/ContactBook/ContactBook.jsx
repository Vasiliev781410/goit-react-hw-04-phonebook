import { useState, useEffect } from "react";
import { ContactForm } from "../ContactForm/ContactForm.jsx";
import { Filter } from "../Filter/Filter.jsx";
import { ContactList } from "../ContactList/ContactList.jsx";
import { nanoid } from 'nanoid'

const initialContacts = [  {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
  {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
  {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
  {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'}];

export const ContactBook = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState("");

  useEffect(()=>{
      try {
        const parsedContacts = JSON.parse(localStorage.getItem("contacts"));
        if (parsedContacts){
          setContacts(parsedContacts);              
        }
      }
      catch (error){
        alert("Parsing error from localStorage");    
      }    
    }
  ,[])

  useEffect(()=>{
      localStorage.setItem("contacts",JSON.stringify(contacts));      
    }
  ,[contacts]);

  const handleSubmit = ({name, number}, evt) => {   
    evt.preventDefault();    
    const indexContact = contacts.findIndex(contact => contact.name === name);
    if (indexContact === -1){
      const newContact = {id: nanoid(), name: name, number: number}; 
      const newList =  [...contacts,newContact]; 
      setContacts(newList);     
    }else{
      alert(`${name} is already in contacts`);
    }    
  };

  const handleChange = evt => {
    setFilter(evt.target.value);     
  };

 function  filterContact(){     
    return contacts.filter(contact=>contact.name.toLowerCase().includes(filter.toLowerCase()));      
  }

  const deleteContact= evt => {     
    const editContactList = contacts.filter(contact=>contact.id !== evt.target.name);  
    setContacts( editContactList);    
  }

     
    return (
        <>      
            <h1>Phonebook</h1>
            <ContactForm onSubmit={handleSubmit}/>
            <h2>Contacts</h2>
            <Filter onChange={handleChange} value={filter}/>            
            <ContactList list={filterContact()} onDeleteContact={deleteContact}/>
      </>
    );
 
};


