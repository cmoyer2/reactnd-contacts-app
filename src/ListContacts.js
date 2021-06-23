import React, {Component} from "react";
import PropTypes from 'prop-types'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: ""
    }
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }
    resetQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state;
        const { contacts, onDeleteContact } = this.props;

        const showContacts = query === ''
            ? contacts
            : contacts.filter((c) => (
               c.name.toLowerCase().includes(query.toLowerCase())
            ));

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>
                </div>
                {showContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Showing {showContacts.length} of {contacts.length}</span>
                        <button onClick={this.resetQuery}>Show all</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div
                                className='contact-avatar'
                                style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}></div>
                            <div className={'contact-details'}>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className={'contact-remove'}
                                    onClick={() => {
                                        onDeleteContact(contact)
                                    }}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts