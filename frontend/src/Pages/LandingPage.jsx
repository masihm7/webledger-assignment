import { useNavigate,NavLink } from "react-router-dom";
import Footer from "../Components/Footer"
import strip from "../assets/strip.jpg"
import banner1 from "../assets/banner1.jpg"
import banner2 from "../assets/banner2.jpg"
import banner3 from "../assets/banner3.jpg"


export const Landing = () => {
    const navigate = useNavigate();
    const tempgrid = [
        {image:"https://img.spoonacular.com/recipes/664658-556x370.jpg",title:"Vegetarian Falafels"},
        {image:"https://img.spoonacular.com/recipes/715415-556x370.jpg",title:"Red Lentil Soup with Chicken and Turnips"},
        {image:"https://img.spoonacular.com/recipes/634629-556x370.jpg",title:"Beef Lo Mein Noodles"},
        {image:"https://img.spoonacular.com/recipes/680975-556x370.jpg",title:"BLT Pizza"},
        {image:"https://img.spoonacular.com/recipes/644127-556x370.jpg",title:"Gajar Ka Halwa"},
        {image:"https://img.spoonacular.com/recipes/642540-556x370.jpg",title:"Falafel Burgers"}
    ]
    return(
        <>
        <nav id="landing-nav">
            <div>
            <h2>RECIPESTACK<i className="fa-solid fa-utensils fa-lg" style={{"marginLeft": "5px", "color":"gray"}}></i></h2>
            <div id="navsearch" >
                    <input type="text" placeholder="Find a Recipe..."/>
                    <button onClick={()=>navigate("/login")}><i className="fa-solid fa-magnifying-glass" style={{ color: "#ffffff" }}></i></button>
            </div>
            <div id="navbtns">
                <p className={"navlink"} style={{"border-right": '1px solid gray'}}>Magazine</p>
                <p className={"navlink"} style={{"border-right": '1px solid gray'}}>News Letters</p>
            <NavLink className={"navlink"} style={{"border-right": '1px solid gray'}} to={"/login"}> Login</NavLink>
            <NavLink className={"navlink"} to={"/signup"}>Signup</NavLink>
            </div>
            </div>

            <div>
            <div>
                    <p className="navlink"><strong>Dinners</strong></p>
                    <p className="navlink"> <strong>Meals</strong></p>
                    <p className="navlink"> <strong>Ingredients</strong></p>
                    <p className="navlink"> <strong>Occasions</strong></p>
                    <p className="navlink"> <strong>Cuisines</strong></p>
                    <p className="navlink"> <strong>Kitchen Tips</strong></p>
                    <p className="navlink"> <strong>News</strong></p>
                    <p className="navlink"> <strong>Features</strong></p>
                </div>
                <NavLink className={"navlink"} to={"/login"} style={{"color": 'rgb(239, 79, 37)' , "font-weight": "700"}}>GET STARTED</NavLink>
            </div>
        </nav>
        <section id="section1">
            <img src={strip} alt="" />
            <img src={banner2} alt="" />
            
        </section>
        <section id="section2">
        <img src={banner1} />
            
        </section>
        <section id="section3">
            <h2>Some <span style={{"color": "rgb(239, 79, 37)"}}>Popular</span> Recipes</h2>
            <div>
            {tempgrid.map((ele)=>{
            return (
                <div id="landingcard">
                    <div>
                    <img src={ele.image}/>
                    </div>
                    <h3>{ele.title}</h3>
                </div>
            )
        })}
            </div>
        
        </section>
        <section id="section4">
                <img src={banner3} />
        </section>

        <Footer/>
        </>
    )
}