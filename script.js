let  url = "http://localhost:3001/users"
let  main = document.querySelector('.centre_people')

let  prem = document.querySelector('.v')
let  input = document.querySelector('.inp')
let  total = document.querySelector('.b')

let  button2  = document.querySelector('.btn2')
let  button3  = document.querySelector('.btn3')
let  button1 = document.querySelector('.btn')

let  form = document.forms.add
let arr = []


function fetchUser() {
   axios.get(url)
      .then(res => {
         reload(res.data)
         arr = res.data
      })
}
fetchUser()

function post(arrr) {
   axios.post(url, arrr)
      .then(res => fetchUser())
}

function edit(id, us) {
   axios.put(url + '/' + id, us)
      .then(res => fetchUser())
}

function removeUser(id) {
   axios.delete(url + '/' + id)
      .then(res => fetchUser())
}



input.onkeyup = () => {
   
   let filt = arr.filter(item => item.name.toLowerCase().includes(inp.value.toLowerCase()))

   reload(filt)
}

button1.onclick = () => {
   button1.style.background = 'white'
   button1.style.color = 'black'
   button2.style.background = '#3B597DFF'
   button2.style.color = 'white' 
   button3.style.background = '#3B597DFF'
   button3.style.color = 'white'

   reload(arr)
}

button2.onclick = () => {
   let risse = arr.filter(item => item.rise)
   button1.style.background = '#3B597DFF'
   button1.style.color = 'white'
   button2.style.background = 'white'
   button2.style.color = 'black'
   button3.style.background = '#3B597DFF'
   button3.style.color = 'white'

   reload(risse)
}

button3.onclick = () => {
   let salaryy = arr.filter(item => item.salary > 1000)
   button1.style.background = '#3B597DFF'
   button1.style.color = 'white'
   button3.style.background = 'white'
   button3.style.color = 'black'
   button2.style.background = '#3B597DFF'
   button2.style.color = 'white'


   reload(salaryy)
}


function reload(arr) {
   main.innerHTML = ''
   let pr = 0
   total.innerHTML = ''
   prem.innerHTML = ''

   for (let item of arr) {
      let box = document.createElement('div')
      let name = document.createElement('p')
      let sallaru = document.createElement('p')
      let for_img = document.createElement('div')
      let premium = document.createElement('img')
      let remove = document.createElement('img')
      let star = document.createElement('img')

      box.classList.add('box')

      name.classList.add('name')
      sallaru.classList.add('sallaru')
      for_img.classList.add('for_img')
      premium.classList.add('premium')
      remove.classList.add('remove')
      star.classList.add('star')
      name.innerHTML = item.name
      sallaru.innerHTML = `${item.salary}$`

      premium.src = './aperture\ \(1\).svg'
      remove.src = './trash-2\ \(2\).svg'
      star.src = './star.svg'

      for_img.append(premium, remove, star)
      box.append(name, sallaru, for_img)
      main.append(box)
      if (item.increase == true) {
         pr++
         name.style.color = 'yellow'
         sallaru.style.color = 'yellow'
      }
      if (item.rise !== true) {
         star.style.display = "none"
      }


      premium.onclick = () => {

         let id = item.id

         if (item.increase == false) {
            item.increase = true

            edit(id, item)
         } else {
            item.increase = false
            edit(id, item)
         }
      }

      name.onclick = () => {
         staring(item)
      }
      sallaru.onclick = () => {
         staring(item)
      }
      star.onclick = () => {
         staring(item)
      }

      remove.onclick = () => {
         let id = item.id
         removeUser(id)
      }


   }
   total.innerHTML = `Общее число сотрудников: ${arr.length}`
   prem.innerHTML = `Премию получат: ${pr}`
}

function staring(item) {
   let id = item.id

   if (item.rise == false) {
      item.rise = true

      edit(id, item)
   } else {
      item.rise = false
      edit(id, item)
   }
}


form.onsubmit = (e) => {


   e.preventDefault()

   let arr = {
      "id": Math.random(),
      "increase": true,
      "rise": false
   }

   let fm = new FormData(form)

   fm.forEach((value, key) => {
      arr[key] = value
   })

   post(arr)
}
