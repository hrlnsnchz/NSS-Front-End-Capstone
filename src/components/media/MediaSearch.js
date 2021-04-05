import React, { useContext } from "react"
import { testAPI } from "../../Settings"
import { MediaContext } from "./MediaProvider"
import { Nav, Button, FormControl, Form} from "react-bootstrap"


export const MediaSearch = () => {
  const { handleAPISearch } = useContext(MediaContext)

  

  return (
    <>
      <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" 
                onKeyUp={(event) => handleAPISearch(event.target.value)}
                placeholder="Search for a movie/series... "/>
                <Button variant="outline-info">Search</Button>
            </Form>
    </>
  )
}

{/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onKeyUp={(event) => handleAPISearch(event.target.value)}/>
                <Button variant="outline-info">Search</Button>
            </Form> */}
        //     <input type="text"
        // className="input--wide"
        // onKeyUp={(event) => handleAPISearch(event.target.value)}
        // placeholder="Search for a movie/series... " />