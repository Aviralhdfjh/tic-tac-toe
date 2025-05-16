import TicTacToe from './components/TicTacToe'

const App = () => {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, Arial, sans-serif',
    }}>
      <TicTacToe />
    </main>
  )
}

export default App
