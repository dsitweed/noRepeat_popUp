import React, { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import myData from './data.json';//import json file

const numberQues = 3; //number of question start = 0
const numberImage = 11//number of image start = 1
const defaultImg = "./0.png"//number image = 0
let imgSrc = makeImageStore("./", numberImage);
let randomQues = [0]; //set up de cau hoi khong lap lai
let randomImage = [0];

const sentence = myData;

class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      end: 0,
    };
  }

  //lay random question
  makeQues() {
    let run; // random question
    var image = document.getElementsByClassName("image");
    var text = document.getElementsByClassName("text");
    if (randomQues.length === numberQues)
      return this.setState({
        end: 1,
      });
    run = noRepeat(randomQues, numberQues); //take random question
    randomQues.push(run); //push vao randomStore
    console.log(run);
    this.setState({
      index: run,
    });
    //refesh image
    for (let i = 0; i < image.length; i++) {
      image[i].style.display = "none";
    }
    for (let i = 0; i < text.length; i++) {
      text[i].style.display = "inline-block";
    }
  }
  //return 1 array 4 url
  makeImage() {
    let length = 4;
    let save = [...randomImage];
    let out = [];//return chuoi nay
    let run;
    for (let i = 0; i < length; i++) {
      run = noRepeat(save, numberImage+1);
      if (run === "end"){
        out.push(0);
      }
      else{
        out.push(run);
        save.push(run);
      }
    }
    console.log(out);
    return out;
  }

  overTurn(overTurnId, saveImage) {
    const take = document.getElementById(overTurnId);
    let zoomId;
    let subString;
    take.childNodes[0].style.display = "none";
    take.childNodes[1].style.display = "inline-block";
    for (let i = 1;i <= 4;i++ ){
      subString = "" + i;  
      if (overTurnId.search(subString) !== -1)
        zoomId = "img0" + i;
    }
    setTimeout(zoomImage(zoomId),2000);//popup after 2s
    if (saveImage !== 0) 
      randomImage.push(saveImage);
  }

  render() {
    const run = this.state.index;//return number of ques
    const runImage = this.makeImage();//return 4 number of imgSrc
    if (this.state.end === 1) {
      return <div id="end">END</div>;
    }
    return (
      <div>
        <Container>
          <Row className="top">
            <Col>
              <p id="header">
                Câu số {run + 1}: {sentence[run].ques}
              </p>
              <hr></hr>
            </Col>
            <Col xs="2">
              <Button onClick={() => this.makeQues()}>Renew</Button>
            </Col>
          </Row>
          {/* Dap an A, B (hay 1,2) */}
          <Row className="bottom">
            <Col>
              <div id="ans1" onClick={() => this.overTurn("ans1",runImage[0])}>
                <div className="text">A. {sentence[run].answer[1]}</div>
                <div className="image">
                  <img
                    id="img01"
                    src={imgSrc[runImage[0]]}
                    alt=""
                    height="100px"
                    width="auto"
                    onClick={() => zoomImage("img01")}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div id="ans2" onClick={() => this.overTurn("ans2",runImage[1])}>
                <div className="text">B. {sentence[run].answer[2]}</div>
                <div className="image">
                  <img
                    id="img02"
                    src={imgSrc[runImage[1]]}
                    alt=""
                    height="100px"
                    width="auto"
                    onClick={() => zoomImage("img02")}
                  />
                </div>
              </div>
            </Col>
          </Row>
          {/* Dap an C,D hay 3,4 */}
          <Row className="bottom">
            <Col>
              <div id="ans3" onClick={() => this.overTurn("ans3",runImage[2])}>
                <div className="text">C. {sentence[run].answer[3]}</div>
                <div className="image">
                  <img
                    id="img03"
                    src={imgSrc[runImage[2]]}
                    alt=""
                    height="100px"
                    width="auto"
                    onClick={() => zoomImage("img03")}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div id="ans4" onClick={() => this.overTurn("ans4",runImage[3])}>
                <div className="text">D. {sentence[run].answer[4]}</div>
                <div className="image">
                  <img
                    id="img04"
                    src={imgSrc[runImage[3]]}
                    alt=""
                    height="100px"
                    width="auto"
                    onClick={() => zoomImage("img04")}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div id="myModal" className="modal">
            <span className="close" onClick={() => closeZoom()}>
              X
            </span>
            <img id="img" alt=""></img>
            <div id="caption"></div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Random;

function zoomImage(id) {
  var modal = document.getElementById("myModal");

  //get image duoc click
  var img = document.getElementById(id);
  var modalImage = document.getElementById("img");
  var caption = document.getElementById("caption");
  modal.style.display = "block";
  modalImage.src = img.src;
  caption.innerHTML = img.alt;
}

function closeZoom() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function makeImageStore(start, number) {
  //return 1 array
  let store = [];
  store.push(defaultImg);//set default image
  let imgUrl = "";
  for (let i = 1; i < number + 1; i++) {
    imgUrl = start + i + ".png";
    store.push(imgUrl);
  }
  console.log(store);
  return store;
}

function isHave(array, n) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === n) return 1; //da ton tai roi
  }
  return 0;
}

function noRepeat(array, length) {
  let a, run;
  //return "end"
  if (array.length === length) return "end";
  do {
    a = Math.random() * length;
    run = Math.floor(a); //run = random number
  } while (isHave(array, run));
  return run;
}
