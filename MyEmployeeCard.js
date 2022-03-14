/*
Usage:
  In plain html page:
  -------------------
    <script type='text/javascript' src='MyEmployeeCard.js' />
  In svelte: 
  ----------
    <script>
      import "./util/MyEmployeeCard";
      ...  
    </script>
    
  HTML/Svelte markup:   
  -------------------
  <div class="view card-container">
    <my-employee-card eid="121111" full-name="Lion Heart" job-position="Developer">
      <p slot="top"><i>** Star Employee **</i></p>
      <p slot="bottom"><b>** Star Employee **</b></p>
    </my-employee-card>
    <my-employee-card eid="133531" full-name="Goat Blah" job-position="Blabberer">
    </my-employee-card>
    <my-employee-card eid="444467" full-name="Brave Heart" job-position="Developer">
    </my-employee-card>
    <my-employee-card eid="561289" full-name="Sheep Blah" job-position="Blabberer">
    </my-employee-card>
  </div>

*/
const templateHtmlStr =  `
  <style>
    :host {
      border: green 1px solid;
      background: lightgrey;
      margin: 10px;
      border-radius: 5%;
      padding: 5px;
    }
    h3 {
      color: green;
    }
    img {
      max-width: 150px;
      border-radius: 50%;
      box-shadow: 0px 3px 5px rgba(0,0,0, 0.5);
      display: block;
      border: 1px solid black;
      user-select: none;
      background: chartreuse;
    }
  </style>
  <slot name="top"></slot>
  <h3>%{fullName}</h3>
  <img src="%{avatarUrl}" alt="%{fullName}, %{position}" />
  <small>Role: <span id='position'>%{position}</span></small><br/>
  <small>Employee ID: <span id='eid'>%{eid}</span></small>
  <slot name="bottom"></slot> <!--named slot-->
  <slot></slot> <!--default slot-->
`;
const template = document.createElement('template');
template.innerHTML = templateHtmlStr;

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content;
  //return template.content.firstChild;
}

/**
 * substitute("<slot style='as;sadf;'>%{0}%,%{1}</slot>", [555, 777]) or 
 * substitute("<slot style='as;sadf;'>%{value}%,%{val1}</slot>", {value:555, val1:777})
 */
const substitute = function() {  
  if (arguments.length > 1) {
    var str = arguments[0];
    const t = typeof arguments[1];
    const args = ("string"===t || "number"===t) ? Array.prototype.slice.call(arguments,1) : arguments[1];
    for (var key in args) {
      str = str.replace(new RegExp("\\%{" + key + "\\}", "gi"), args[key]);
    }
    return str;
  }
  return arguments.length>0 ? arguments[0] : null;
};

class MyEmployeeCardElement extends HTMLElement {

  static get observedAttributes() {
    return ['disabled', 'job-position', 'full-name', 'eid'];
  }
  static numInstances = 0;
  static numSelected = 0;

  isCreateInConstructor = true;
  /*
  Note: Overwriting an element's children with new content is generally not a good idea because it's unexpected. Users would be surprised to have their markup thrown out. A better way to add element-defined content is to use shadow DOM.  
  */
  isUseShadowDom = true;
  isUseSubstition = false;  //uses substitution for vars in the html TEMPLATE 
    
  get avatarUrl() {
    return this.eID ? `https://api.minimalavatars.com/avatar/random${this.eID}/svg` : null; 
  }
  selected = false;
  isFirstTime = true;
    
  //these getters and setters ensure that custom element DOM properties are reflected back to attributes 
  //"Reflecting properties to attributes"
  //these ensure the JS state is in sync with the DOM representation 
  get disabled() { return this.hasAttribute('disabled') }
  set disabled(val) { val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') }
  
  get jobPosition() { return this.getAttribute('job-position') }
  set jobPosition(val) { this.setAttribute('job-position', val) }
  
  get fullName() { return this.getAttribute('full-name') }
  set fullName(val) { this.setAttribute('full-name', val) }
  
  get eID() { return this.getAttribute('eid') }
  set eID(val) { this.setAttribute('eid', val); }  

  get numSelected() { MyEmployeeCardElement.numSelected };

	// We have to declare a custom constructor
  constructor() {
  	// First, call super() 
    super()
    MyEmployeeCardElement.numInstances++;

    this.isUseShadowDom && this.attachShadow({mode: 'open'});
    if (this.isCreateInConstructor) {
      this._initialize();
      this.isFirstTime = false; 
    }
    
    this.addEventListener('click', this.onClick);
  }

  onClick(e) {
    console.log(this.fullName, e);
    //console.log(this.disabled ? 'disabled' : 'enabled');
    const thisOrShadowRoot = this.isUseShadowDom ? this.shadowRoot : this;
    if (!this.selected) {
      this.classList.add('user-selected');
      this.style.background = 'gold';
      MyEmployeeCardElement.numSelected++;
    } else {
      this.classList.remove('user-selected');
      this.style.background = '';
      MyEmployeeCardElement.numSelected--;
    }
    this.selected = !this.selected;
    //this.style.background = this.style.background !== 'gold' ? 'gold' : '';        
  }
  
  _initialize() {
    // Then we can take care of our attributes 
    const position = this.position; //this.getAttribute('job-position');
    const fullName = this.fullName; //this.getAttribute('full-name');;
    //const eid = this.hasAttribute('eid') && this.getAttribute('eid') || Math.round(Math.random()*1e6);    
    if (!this.eID)
      this.eID = Math.round(Math.random()*1e6);
    const eid = this.eID; 
    //this.avatarUrl = `https://api.minimalavatars.com/avatar/random${eid}/png`;
    const avatarUrl = this.avatarUrl;
    
    if (true) {
      //Another way to declare the HTML using the TEMPLATE tag 
      //let thisOrShadowDom = this.isUseShadowDom ? this.attachShadow({mode: 'open'}) : this;
      let thisOrShadowDom = this.isUseShadowDom ? this.shadowRoot : this;
      //In order to activate this markup, we have to import it to the document and later to append it to the shadow DOM
      if (!this.isUseSubstition) { 
        //Let's find our template tag and extract the content from it
        //let template = document.querySelector('#employee-card-template');
        //let templateContent = template.content;
        //const content = document.importNode(template.content, true); //OR clone it: template.content.cloneNode(true)        
        let templateContent = htmlToElement(templateHtmlStr); 
        //const content = document.importNode(templateContent, true); 

        //-----NOT necessary to set this here bcoz attributeChangedCallback set these, which is also called during 1st initialization 
        //content.querySelector('h3').textContent = fullName;
        //content.querySelector('img').src = avatarUrl;
        //content.querySelector('img').alt = `${fullName}, ${position}`;
        //content.querySelector('#position').textContent = position;
        //content.querySelector('#eid').textContent = eid;
        
        // Now we can render the real DOM behind our custom tag
        thisOrShadowDom.appendChild(templateContent);
      } else {
        let htmlStr = substitute(templateHtmlStr, {position, fullName, avatarUrl, eid});
        let templateContent = htmlToElement(htmlStr)
        thisOrShadowDom.appendChild(templateContent);
        //thisOrShadowDom.innerHTML = htmlStr; //NOT recommended because user slots in existing markup is overwritten
      }
    } //else TEMPLATE    
      
  }
  
  //custom element reaction callback
  connectedCallback() {
    //u can create the HTML structure here for this custom element 
    console.debug('Element is inserted into the DOM, ready to run setup/initialization code');
    //set the image src here 

    //u could optional do setup here , but NOTE that this elements DOM/ShadowDOM is empty 
    // there are no children on that stage, the DOM is unfinished. HTML parser connected 
    // the custom element <user-info>, and is going to proceed to its children, but just didn’t yet.    
    // when constructor is called, it’s yet too early. The element is created, but the browser did 
    // not yet process/assign attributes at this stage: calls to getAttribute would return null. 
    // So we can’t render there.
    if (this.isCreateInConstructor) {
      this._initialize();
      
      //pick up the attribute values now 
      
      //Note that modifying the DOM at this stage fails, since it's not yet fully ready 
      //TODO figure out how to do this without setTimeout 
      if (false) {
        this.isFirstTime = false; 
        this.attributeChangedCallback('full-name', NaN, this.fullName);
        this.attributeChangedCallback('job-position', NaN, this.jobPosition);
        this.attributeChangedCallback('eid', NaN, this.eID);    
      }
      
      setTimeout(()=>{
        this.isFirstTime = false; 
        this.attributeChangedCallback('full-name', NaN, this.fullName);
        this.attributeChangedCallback('job-position', NaN, this.jobPosition);
        this.attributeChangedCallback('eid', NaN, this.eID);
      }, 500);
    }
    
  }
  
  //custom element reaction callback
  disconnectedCallback() {
    //e.g. customEl.remove()
    //sometimes this is never called, e.g. if user closes the browser tab 
    console.debug('Element is removed from the DOM, ready to run clean-up code');
    this.removeEventListener('click', this.onClick);
  }
  
  //custom element reaction callback
  adoptedCallback() {
    console.debug('Element has been moved into a new document, e.g. document.adoptNode');
  }
  
  //custom element reaction callback
  attributeChangedCallback(name, oldVal, newVal) {
    //Browser calls this method for every change to attributes listed in the observedAttributes array.
    //Called when an observed attribute has been added, removed, updated, or replaced. Also called 
    //for initial values when an element is created by the parser, or upgraded. 
    //Note: only attributes listed in the observedAttributes property will receive this callback.
    if (this.isFirstTime) {
      console.debug("isFirstTime, ignoring attribute changes");
      return;
    }
    if (true || oldVal!==null)
      console.log(`attribute[${name}] changed from ${oldVal} to ${newVal}`);
    //if (oldVal===newVal) return;
    
    const thisOrShadowRoot = this.isUseShadowDom ? this.shadowRoot : this;  
    if (thisOrShadowRoot?.querySelector) {
      if (name==='job-position') {
        thisOrShadowRoot.querySelector('#position').textContent = newVal;
        thisOrShadowRoot.querySelector('img').alt = `${this.fullName}, ${newVal}`;
      } else if (name==='full-name') {
        thisOrShadowRoot.querySelector('h3').textContent = newVal;
        thisOrShadowRoot.querySelector('img').alt = `${newVal}, ${this.jobPosition}`;
      } else if (name==='eid') {
        thisOrShadowRoot.querySelector('#eid').textContent = newVal;
        thisOrShadowRoot.querySelector('img').src = this.avatarUrl;
      }
    }
    if (name==='') {
      //update the html 
      if (this.shadowRoot) {
        this.shadowRoot
      } else if (this.innerHTML) {
        this.innerHTML.query
      }
    }
  }
  
} //end class

window.customElements.define('my-employee-card', MyEmployeeCardElement);
