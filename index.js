const {
    getContacts,
    getContactById,
    addContact,
    removeContact,
  } = require("./contacts");
  const argv = require("yargs").argv;
  
  const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const allContacts = await getContacts();
        console.table(allContacts);
        break;
  
      case "get":
        const contactById = await getContactById(id);
        console.table(contactById);
        break;
  
      case "add":
        const newContact = await addContact({ name, email, phone });
        console.table(newContact);
        break;
  
      case "remove":
        const removedContact = await removeContact(id);
        console.table(removedContact);
        break;
  
      default:
        console.warn("Unknown action type!");
    }
  };
  
  invokeAction(argv);