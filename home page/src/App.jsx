import './App.css'
import ImageTextBlock from './ImageTextBlock'
import Footer from './Footer'

function App() {

  const execom = {
    title: "Execom Members",
    content: [
      { position: "President", name: "Smaran R Bharadhwaj" },
      {position : "Branch Counsellor" , name : "Aishwarya Singh Gautam"},
      { position: "Vice President", name: "Sujay" },
      { position: "Secretary", name: "Kanu Preiya" },
      { position: "WebMaster", name: "Apoorv Gadiya" },
      { position: "Treasurer", name: "Kavya Garg" }
    ]
  }  

  const members = {
    title : "Members",
    content : "Meet the heart of IEEE RVU SB: a dedicated group of individuals who are the backbone of our student branch. Their unwavering commitment, leadership, and enthusiasm drive our initiatives and create an inspiring environment for all members. Together, they shape the future and uphold the values of our community."
  }
  return (
    <>
      <nav>
      <div className="nav-content">
        <div className="logo">
          <a href="#">
            IEEE RVU SB
            {/* logo img could be added too */}
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About SB</a>
          </li>
          <li>
            <a href="#">Events And Competitions</a>
          </li>
          <li>
            <a href="#">Announcements</a>
          </li>
          <li>
            <a href="#">Contact US</a>
          </li>
        </ul>
      </div>
    </nav>

    <div className='main'>
        <h1 className='teamHead'>Meet Our Team!!</h1>
        <ImageTextBlock num = "1" title= {execom.title} content = {execom.content}></ImageTextBlock>
        <ImageTextBlock num = "2" title= {members.title} content = {members.content}></ImageTextBlock>
    </div>
    <Footer></Footer>
  </>
  )
}

export default App
