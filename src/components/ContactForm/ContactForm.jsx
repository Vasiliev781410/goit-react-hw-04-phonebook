import { useState } from "react";
import css from "./ContactForm.module.css";
import PropTypes from 'prop-types';

export const ContactForm = ({onSubmit}) => {
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");
  
    const onChange = (e)=>{
        e.preventDefault();
        const {name,value} = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default:
                break;
        }    
       
    };
    const onSubmitLocal = (evt)=>{
        onSubmit({name,number},evt);
        setName("");        
        setNumber("");       
    };

  
    return (
        <form onSubmit={onSubmitLocal} className={css.contactForm} action="">
            <div className={css.contactForm__item}>
                <label className={css.contactForm__label} htmlFor="inputName">Name</label>
                <input 
                    onChange={onChange}
                    value={name}
                    className={css.contactForm__input}
                    type="text"
                    name="name"
                    id="inputName"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />                
            </div>
            <div className={css.contactForm__item}>
                <label className={css.contactForm__label} htmlFor="inputPhone">Number </label>
                <input
                    onChange={onChange}
                    value={number}
                    className={css.contactForm__input}
                    type="tel"
                    id="inputPhone"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </div>
           <button className={css.contactForm__addBtn} type="submit">Add contact</button>
        </form>
    )    
}

ContactForm.propTypes = {  
    onSubmit: PropTypes.func,
  };
