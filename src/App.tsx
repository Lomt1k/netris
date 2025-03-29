import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from './components/Container/Container';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <Container>
            <h1 className="visually-hidden">Тестовое задание для компании Нетрис</h1>
            <VideoPlayer
              videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              dataUrl="/video-marks.json"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App;
