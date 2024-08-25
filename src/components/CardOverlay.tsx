import React from 'react';
import { Descriptions} from 'antd';
import { Card } from '../types/Card';
import 'antd/dist/reset.css';


interface OverlayProps {
  card: Card;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ card, onClose }) => {

  
  return (
    <div className="overlay" onClick={onClose}>
     <button className="overlay-close-btn" onClick={onClose}>X</button>
      <div className="overlay-content">
        <img className="overlay-content-img"src={card.largeImageUri} alt={card.name} style={{ width: 'auto', height: 'auto' }} />
        
        <div className="overlay-content-details" >
          <Descriptions title={card.name}  size='middle' layout='vertical'>
            <Descriptions.Item label="Oracle Text" span={4}>{card.oracleText}</Descriptions.Item>

            <Descriptions.Item label="Converted Mana Cost">{card.cmc}</Descriptions.Item>
            <Descriptions.Item label="Type" span={2}>{card.typeLine}</Descriptions.Item>

            <Descriptions.Item label="Rarity">{card.rarity}</Descriptions.Item>

            <Descriptions.Item label="Set" span={1}>{card.setName}</Descriptions.Item>
            <Descriptions.Item label="Release Date"span={1}>{card.releasedAt}</Descriptions.Item>

           

            <Descriptions.Item label='Prices' span={4}>
              <Descriptions layout='vertical' >
                <Descriptions.Item label="USD" span={1}>${card.usdPrice || ' --'}</Descriptions.Item>
                <Descriptions.Item label="USD Foil" span={1}>${card.usdFoilPrice || ' --'}</Descriptions.Item>
                <Descriptions.Item label="USD Foil Etched" span={1}>${card.usdEtchedPrice || ' --'}</Descriptions.Item>
                <Descriptions.Item label="EUR" span={1}>€{card.eurPrice || ' --' }</Descriptions.Item>
                 <Descriptions.Item label="EUR Foil" span={1}>€{card.eurFoilPrice || ' --'} </Descriptions.Item>
                <Descriptions.Item label="TIX" span={1}>{card.tixPrice || ' --'}</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>

            <Descriptions.Item label="Links" span={4} style={{textAlign:'center'}}>
                <a href={card.tcgplayerUri} style={{paddingRight:'1em', paddingLeft:'1em'}} target="_blank" rel="noopener noreferrer"> TCGPlayer </a>
                <a href={card.cardmarketUri} style={{paddingRight:'1em', paddingLeft:'1em'}} target="_blank" rel="noopener noreferrer"> CardMarket </a>
                <a href={card.cardhoarderUri} style={{paddingRight:'1em', paddingLeft:'1em'}} target="_blank" rel="noopener noreferrer"> CardHoarder </a>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
