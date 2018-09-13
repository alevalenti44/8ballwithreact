import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//The shaking animation
import { ShakeSlow, ShakeHard } from 'reshake';
//The fade in for text
import { Motion, spring } from 'react-motion';

class Main extends React.Component {
    state = {
        //array of possible outcome answers
        answers: [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            "Don't count on it",
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
        ],
        //The users answer:
        userOutcome: '',
        //checks if button is clicked:
        clicked: false,
        //The users question:
        userQuestion: '',
        //The error message that will appear if there is no question
        errorMessage: '',
    };

    //Handles changes to input field
    handleChange = input => {
        this.setState({ userQuestion: input });
    };


    //Handles onClick event
    getReply = () => {

        /*If the users questions contains more than one character,
         print out the outcome if not show error message for 4 secs*/

        if (this.state.userQuestion.length > 1) {

            /*Picks random answer from this.state.answers array*/

            let randomNum = Math.floor(Math.random() * 19) + 1;
            let reply = this.state.answers[randomNum];
            console.log(reply);
            this.setState({
                userOutcome: reply,
                clicked: true,
            });

            console.log('is clicked?' + this.state.clicked);

            /* Makes users question disappear after 4 seconds after ball shakes*/
            setTimeout(() => {
                this.setState({ clicked: false, userQuestion: '' });
            }, 4000);

        } else {

            this.setState({
                /*Creates array if input field is empty*/
                errorMessage: (
                    <p style={{
                        color: 'red',
                        fontSize: 15,
                        display: 'flex',
                        marginTop: 10,
                        justifyContent: 'center',
                    }}>
                        Question Is Required{' '}
                    </p>
                ),
            });
        }

        /*Makes error message disappear after 3 seconds */
        setTimeout(() => {
            this.setState({ errorMessage: '' });
        }, 3000);

    };

    render() {
        return (
            <div>
                {/*Makes ball do shake animation*/}
                <ShakeSlow h={30} v={1} dur={1000} freez={true} fixedStop={true}>
                    <div className="eight-ball">
                        <div className="sheen" />
                        <div className="viewer">

                            {/*Makes text fade in and out*/}
                            <Motion
                                style={{
                                    currentOpacity: spring(this.state.clicked ? 1 : 0, {
                                        stiffness: 140,
                                        damping: 20,
                                    }),
                                }}
                            >
                                {({ currentOpacity }) => (
                                    <div
                                        className="userAnswerTextBox"
                                    >

                                        <p
                                            style={{
                                                color: '#ffffff',
                                                textAlign: 'center',
                                                margin: 'auto',
                                                fontSize: 'large',
                                                opacity: currentOpacity
                                            }}
                                        >
                                            {/*Sets <p> as the userOutcome*/}
                                            {this.state.userOutcome}
                                        </p>
                                    </div>
                                )}
                            </Motion>
                        </div>
                    </div>
                </ShakeSlow>
                <br />

                <div
                    className="questionForm"
                    style={{ display: 'flex', justifyContent: 'center' }}
                >

                    {/*Gets value of input field calling it e*/}
                    <input
                        className="inputGroup"
                        name="userQuestion"
                        onChange={e => this.handleChange(e.target.value)}
                        value={this.state.userQuestion}
                        type="text"
                    />


                    <button className="inputButton" onClick={this.getReply}>
                        Ask!
                    </button>
                </div>

                <p>{this.state.errorMessage}</p>

            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));