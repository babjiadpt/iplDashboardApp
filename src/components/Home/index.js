// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {isLoading: true, teamList: []}

  componentDidMount = () => {
    this.getTeamList()
  }

  getTeamList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const responseData = await response.json()

    const fetchedData = responseData.teams.map(eachCard => ({
      id: eachCard.id,
      name: eachCard.name,
      teamImageUrl: eachCard.team_image_url,
    }))

    this.setState({
      teamList: fetchedData,
      isLoading: false,
    })
  }

  renderTeamCardDetails = () => {
    const {teamList} = this.state

    return (
      <ul className="team-cards-list-container">
        {teamList.map(eachTeam => (
          <TeamCard teamDetails={eachTeam} key={eachTeam.id} />
        ))}
      </ul>
    )
  }

  renderDashBoard = () => (
    <div className="dash-board-container">
      <div className="title-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
          className="ipl-logo"
        />
        <h1 className="ipl-heading">IPL Dashboard</h1>
      </div>
      {this.renderTeamCardDetails()}
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderDashBoard()
        )}
      </div>
    )
  }
}
export default Home
