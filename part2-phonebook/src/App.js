import { useState, useEffect } from "react";
import contactService from "./services/contacts";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // fetch contacts from server
  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setContacts(initialContacts);
    });
  }, []);

  // filter contacts
  const contactsToShow =
    filter === ""
      ? contacts
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );

  const filterHandler = (event) => {
    setFilter(event.target.value);
  };

  // add new contact
  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
    };

    if (contacts.some((contact) => contact.name === newName))
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const contact = contacts.find((contact) => contact.name === newName);
        const changedContact = { ...contact, number: newNumber };
        contactService
          .update(contact.id, changedContact)
          .then((returnedContact) => {
            setContacts(
              contacts.map((contact) =>
                contact.id !== returnedContact.id ? contact : returnedContact
              )
            );
            setSuccessMessage("Number changed successfully");
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
            
          })
          .catch((error) => {
            setSuccessMessage(
              `Information of ${newName} has already been removed from server`
              );
              setTimeout(() => {
                setSuccessMessage(null);
              }, 5000);
              setContacts(contacts.filter((contact) => contact.id !== contact.id));
              setNewName("");
              setNewNumber("");
          });

      } else {
        setNewName("");
        setNewNumber("");
      }
    else {
      contactService.create(contactObject).then((returnedContact) => {
        setContacts(contacts.concat(returnedContact));
        setSuccessMessage("Contact added successfully");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  // delete contact
  const deleteContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.deleteContact(id).then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} />
      {/* filter component */}
      <div>
        filter shown with <input value={filter} onChange={filterHandler} />
      </div>
      <h2>Add a new</h2>
      {/* add contact component */}
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {/* display contacts */}
      <h3>Contacts</h3>
      <ul>
        {contactsToShow.map((contact) => (
          <li className="contact" key={contact.id}>
            {contact.name} {contact.number}
            <button onClick={() => deleteContact(contact.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
