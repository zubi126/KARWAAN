function EventCard({ event }) {

  return (

    <div style={{
      border:"1px solid #ddd",
      padding:"20px",
      margin:"10px",
      borderRadius:"8px",
      width:"300px"
    }}>

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p><b>Date:</b> {event.date}</p>

      <p><b>Location:</b> {event.location}</p>

      <p><b>Type:</b> {event.type}</p>

    </div>

  )

}

export default EventCard