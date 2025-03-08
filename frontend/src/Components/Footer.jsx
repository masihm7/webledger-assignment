import React from 'react'

const Footer = () => {
  return (
    <footer>
            <div>
                <div>
                    <h2>RECIPESTACK <i className="fa-solid fa-utensils fa-lg" style={{"marginLeft": "5px", "color":"gray"}}></i></h2>
                    <button>NEWSLETTERS</button>
                    <div>
                        <p>follow us</p>
                        <div>
                        <i className="fa-brands fa-facebook fa-xl" style={{ color: "#3a3c41" }}></i>
                        <i className="fa-brands fa-twitter fa-xl" style={{ color: "#3a3c41" }}></i>
                        <i className="fa-brands fa-instagram fa-xl" style={{ color: "#3a3c41" }}></i>
                        <i className="fa-brands fa-pinterest-p fa-xl" style={{ color: "#3a3c41" }}></i>
                        <i className="fa-brands fa-tiktok fa-xl" style={{ color: "#3a3c41" }}></i>
                        <i className="fa-brands fa-youtube fa-xl" style={{ color: "#3a3c41" }}></i>
                        </div>
                    </div>
                </div>
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
                <div>
                <div>
                    <p className="navlink">About Us</p>
                    <p className="navlink">Anti-Racism Pledge</p>
                    <p className="navlink">Product Vetting</p>
                    <p className="navlink">Advertise</p>
                    <p className="navlink">Contact</p>
                </div>
                <div>
                    <p className="navlink">Editorial Process</p>
                    <p className="navlink">Privacy Policy</p>
                    <p className="navlink">Terms of Service</p>
                    <p className="navlink">Careers</p>
                </div>
                </div>
            </div>
            <p>Allrecipes is part of the Dotdash Meredith publishing family.</p>
        </footer>
  )
}

export default Footer
