import axios from 'axios';
const form=document.querySelector('form');
const addressInput=document.getElementById('address')! as HTMLInputElement;
const API_KEY=process.env.API_KEY;
declare var google:any;

type GoogleGeocodingResp={
    results:{geometry:{location:{lat:number,long:number}}}[];
    status:'OK'| 'ZERO_RESULTS';
};

function handler(event:Event){
    event.preventDefault();
    const entered=addressInput.value;
    axios.get<GoogleGeocodingResp>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(entered)}&key=${API_KEY}`)
    .then(res=>{
        if(res.data.status!=='OK'){
            const coordinates=res.data.results[0].geometry.location;
            console.log(res)
            const map=new google.maps.Map(document.getElementById('map'),{
                center:coordinates,
                zoom:15
            });
            new google.maps.Marker({position:coordinates,map:map})
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
form?.addEventListener('submit',handler);