const {createApp} = Vue;
const dt = luxon.DateTime;

createApp({
    data(){
        
        let currentTime = dt.now().setLocale('it').toLocaleString(dt.TIME_SIMPLE);


        return{

            actualContact : 0,

            searchBarInput: '',

            newMessage : {
                date : currentTime,
                message : '',
                status: 'sent'
            },

            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ] 
        }
    },
    methods:{
        sendMessage(){
            this.contacts[this.actualContact].messages.push({...this.newMessage});
            

            this.newMessage.message = '';
            this.newMessage.date = dt.now().setLocale('it').toLocaleString(dt.TIME_SIMPLE);
            console.log(this.newMessage)

            const autoMessage = {
                date: dt.now().setLocale('it').toLocaleString(dt.TIME_SIMPLE),
                message: "non posso scrivere ora, ti chiamo tra un po'",
                status: 'received'
            }

            //per evitare che cambi l'attuale indice nei secondi del setTimeout
            const actual = this.actualContact;

            setTimeout(() => {
                this.contacts[actual].messages.push(autoMessage);
            }, 2000)
        },

        filterChat(){

            //prelevo il valore dell'input e lo salvo nei data
            //ad ogni battitura nel campo input si attiva la funzione
            // se la key name non include il valore dell'input, la key visible diventa False
            // con un v-if nei contatti, quelli che hanno visible false non compariranno

            //scorro l'array di oggetti.
            for (let i = 0; i< this.contacts.length; i++){

                //salvo in variabile il valore della key
                const contact = this.contacts[i].name.toLowerCase();

                if(!contact.startsWith(this.searchBarInput)){
                    //il valore della key visible diventa false
                    this.contacts[i].visible = false;
                };

                //quando cancello tutto il testo del campo imput la ricerca si interrompe rimostrando tutti i contatti
                if(this.searchBarInput === ""){
                    this.contacts[i].visible = true;
                }
            }
        },

        //con questa funzione cancellando eventuali lettere sbagliate(che quindi hanno settato su false il valore),
        // se il nuovo valore stringa corrisponde, riporta il valore di visible su true
        reFilterChat(){
            for (let i = 0; i< this.contacts.length; i++){
                const contact = this.contacts[i].name.toLowerCase();

                if(contact.startsWith(this.searchBarInput)){
                    this.contacts[i].visible = true;
                };
            }
        },

        // showMe(index){
        //     this.contacts[this.actualContact].messages[index] = thisContact

        // },


        deleteMessage(index){
            this.contacts[this.actualContact].messages.pop(index);
        }

    },
    created(){
        console.log('Running created')
    }
}).mount("#app")


