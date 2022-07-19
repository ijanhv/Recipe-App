import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'; 
import { motion } from 'framer-motion';



function Recipe() {

  let params = useParams();
  const [ details, setDetails ] = useState({});
  const [ activeTab, setActiveTab ] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=1785c91bbb6b456d8256dff56310e7c9`);
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return <DetailWrapper>
      <motion.div
       animate={{opacity: 1}}
       initial={{opacity: 0}}
       exit={{opacity: 0}}
       transition={{duration: 0.5}}>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </motion.div>
      <Info>
        <Button className={ activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')} >Instructions</Button>
        <Button className={ activeTab === 'ingredients' ? 'active' : ''}onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' && (
          <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div>
        )}
         {activeTab === 'ingredients' && (
          <ul>
          {details.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.original}
            </li>
          ))}
        </ul>
         )}
        
      </Info>
    </DetailWrapper>
  
}

const DetailWrapper = styled.div`
   margin-top: 10rem;
   margin-bottom: 5rem;
   display: flex;

   .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
   }
   h2{
    margin-bottom: 2rem;
   }
   li {
    font-size: 1.7rem;
    line-height: 2.5rem;
   }
   ul{
    margin-top: 2rem;
   }
`;

const Button = styled.div`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  border-radius: 0.5rem;
  margin-right: 2rem;
  margin-top: 2.5rem;
  font-weight: 600;
  cursor: pointer;
  display: inline;
`;

const Info = styled.div`
  margin-top: 1.5rem;
  margin-left: 10rem;
`;

export default Recipe