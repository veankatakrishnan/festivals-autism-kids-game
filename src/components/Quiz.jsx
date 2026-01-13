import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { festivals } from '../data/festivals';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const festival = festivals.find(f => f.id === id);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]); // [{ question, userAnswer, isCorrect }]
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

    if (!festival || !festival.quiz) return <div>Quiz not found</div>;

    const currentQuestion = festival.quiz[currentQuestionIndex];

    const handleOptionClick = (option) => {
        if (feedback) return; // Prevent clicking during feedback

        const isCorrect = option === currentQuestion.answer;
        setSelectedOption(option);
        setFeedback(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            setScore(s => s + 1);
        }

        // Auto advance after short delay
        setTimeout(() => {
            setHistory([...history, {
                question: currentQuestion.question,
                userAnswer: option,
                correctAnswer: currentQuestion.answer,
                isCorrect
            }]);

            if (currentQuestionIndex < festival.quiz.length - 1) {
                setCurrentQuestionIndex(curr => curr + 1);
                setSelectedOption(null);
                setFeedback(null);
                setShowHint(false);
            } else {
                setQuizCompleted(true);
            }
        }, 1500); // 1.5s delay to read feedback
    };

    if (quizCompleted) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '3rem', color: festival.color }}>Quiz Results!</h1>
                    <p style={{ fontSize: '1.5rem' }}>You got {score} out of {festival.quiz.length} correct.</p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {history.map((item, idx) => (
                        <div key={idx} style={{
                            background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)',
                            borderLeft: `5px solid ${item.isCorrect ? 'var(--color-success)' : 'var(--color-accent)'}`,
                            boxShadow: 'var(--color-shadow)'
                        }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{idx + 1}. {item.question}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: item.isCorrect ? 'var(--color-success)' : 'var(--color-accent)' }}>
                                    Your Answer: {item.userAnswer}
                                </span>
                                {item.isCorrect ? <CheckCircle size={24} color="var(--color-success)" /> : <XCircle size={24} color="var(--color-accent)" />}
                            </div>
                            {!item.isCorrect && (
                                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                    Correct Answer: <strong>{item.correctAnswer}</strong>
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="btn"
                    style={{
                        marginTop: '2rem', width: '100%', padding: '1rem',
                        background: festival.color, color: 'white', borderRadius: 'var(--radius-full)'
                    }}
                >
                    Back to Menu
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ background: 'transparent', fontSize: '1.2rem' }}>
                    <ArrowLeft /> Quit
                </button>
                <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
                    Question {currentQuestionIndex + 1} / {festival.quiz.length}
                </div>
            </div>

            <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
                <h2 style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--color-text)' }}>
                    {currentQuestion.question}
                </h2>

                {/* Hint Section */}
                <div style={{ textAlign: 'center', minHeight: '2rem' }}>
                    {!showHint ? (
                        <button
                            onClick={() => setShowHint(true)}
                            className="btn"
                            style={{ background: '#FFF3CD', color: '#856404', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}
                        >
                            <Lightbulb size={18} /> Need a Hint?
                        </button>
                    ) : (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#856404', background: '#FFF3CD', padding: '0.5rem', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
                            💡 {currentQuestion.hint}
                        </motion.p>
                    )}
                </div>

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {currentQuestion.options.map(option => {
                        let bgColor = 'white';
                        if (selectedOption === option) {
                            bgColor = feedback === 'correct' ? '#d4edda' : '#f8d7da';
                        }

                        return (
                            <motion.button
                                key={option}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOptionClick(option)}
                                disabled={feedback !== null}
                                style={{
                                    padding: '1.5rem',
                                    fontSize: '1.2rem',
                                    border: '2px solid #eee',
                                    borderRadius: 'var(--radius-lg)',
                                    background: bgColor,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                {option}
                                {selectedOption === option && feedback === 'correct' && <CheckCircle color="green" />}
                                {selectedOption === option && feedback === 'wrong' && <XCircle color="red" />}
                            </motion.button>
                        );
                    })}
                </div>

                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                            textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold',
                            color: feedback === 'correct' ? 'var(--color-success)' : 'var(--color-accent)'
                        }}
                    >
                        {feedback === 'correct' ? 'Correct! 🎉' : 'Oops, try again next time!'}
                    </motion.div>
                )}

            </motion.div>
        </div>
    );
};

export default Quiz;
