import React, { useContext } from "react"
import { MediaContext } from "./MediaProvider"
import { Button, FormControl, Form} from "react-bootstrap"


export const MediaSearch = () => {
  const { handleAPISearch } = useContext(MediaContext)

  

  return (
    <>
      <Form inline>
            <FormControl size="sm" type="text" placeholder="Search" className="mr-sm-2" 
            onKeyUp={(event) => handleAPISearch(event.target.value)}
            placeholder="Search for a movie/series... "/>
            <Button size="sm" variant="outline-info">Search</Button>
        </Form>
    </>
  )
}
