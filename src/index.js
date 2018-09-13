import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ShakeSlow, ShakeHard } from 'reshake';

import { Motion, spring } from 'react-motion';

class Main extends React.Component {
    state = {
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
        userOutcome: '',
        clicked: false,
        userQuestion: '',
        errorStyle: '',
    };

    handleChange = input => {
        this.setState({ userQuestion: input });
    };

    getReply = () => {

        if (this.state.userQuestion.length > 1) {
            let randomNum = Math.floor(Math.random() * 19) + 1;
            let reply = this.state.answers[randomNum];
            console.log(reply);
            this.setState({
                userOutcome: reply,
                clicked: true,
            });

            console.log('is clicked?' + this.state.clicked);

            setTimeout(() => {
                this.setState({ clicked: false, userQuestion: '' });
            }, 4000);

        } else {
            this.setState({
                errorStyle: (
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

        setTimeout(() => {
            this.setState({ errorStyle: '' });
        }, 3000);

    };

    render() {
        return (
            <div>
                <ShakeSlow h={30} v={1} dur={1000} freez={true} fixedStop={true}>
                    <div className="eight-ball">
                        <div className="sheen" />
                        <div className="viewer">
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
                <p>{this.state.errorStyle}</p>

            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));