import { Container, Card, CardDeck, Row ,Col} from 'react-bootstrap';
const { useState, useEffect } = require("react")
const URL ="https://gateway.marvel.com:443/v1/public/characters?apikey=976f9adb78f5c3d266604c65d11b33c5&hash=97fe50ff7ae6d96ba3c463e1a9a67656&ts=marvel"
const Hero=()=>{
    const [heroes,setHeroes]=useState([]);
    const [message,setMessage]=useState("This are some of marvel universe superheroes")
    useEffect(()=>{
        if (!navigator.onLine){
            if(localStorage.getItem("heroName")===null){
                setMessage("You're offline, please try again");
            }else{
                console.log("Entre al guuardar")
                const heroe={
                    name:localStorage.getItem("heroName"),
                    description:localStorage.getItem("heroDescription"),
                    modified:localStorage.getItem("heroModified"),
                    thumbnail:{
                        path:"../public/image_not_available",
                        extension:"jpg"
                    }
                }
                setHeroes(... heroes,heroe)
            }
        }else{
            fetch(URL).then(res=>res.json()).then(res=>{
                console.log(res.data.results)
                setHeroes(...heroes,res.data.results);
                localStorage.setItem("heroName",res.data.results[0].name)
                localStorage.setItem("heroDescription",res.data.results[0].description)
                localStorage.setItem("heroModified",res.data.results[0].modified)
            })
        }
    },[])


    return(
        <div>
            <h1>Marvel studios</h1>
            <p>{message}</p>
            <Container>
            {heroes.map((h)=>(
                <div>         
                <Row>
                    <Col sm={3}>
                    <Card style={{ width: '18rem' }}>
                     <Card.Img variant="top" width="280" height="160"  src={""+h.thumbnail.path+"."+h.thumbnail.extension} />
                    <Card.Body>
                    <Card.Title>{h.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"Modified:"+h.modified}</Card.Subtitle>
                    <Card.Text>
                        {h.description}
                    </Card.Text>
                </Card.Body>
                </Card>
                    </Col>
 
                </Row>
                </div>
            ))}
            </Container>
            
        </div>
    )
}

export default Hero