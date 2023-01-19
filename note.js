const addBtn = document.querySelector("button")
const main = document.querySelector(".main")

const saveNote = () =>{
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    // console.log('ok')
    notes.forEach((item)=>{
        data.push(item.value)
    })
    if(data.length === 0){
        localStorage.removeItem("notes")
    }else{
        // to save the notes in local Storage 
        localStorage.setItem("notes", JSON.stringify(data))
    }
}


addBtn.addEventListener("click", ()=>{
    addnote();
})

const addnote =(text = "")=>{
    const note = document.createElement("div")
    note.classList = ("note")

    note.innerHTML = `
            <div class="top">
                <i class="save fa-regular fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>
            <textarea>${text}</textarea>
    `
    note.querySelector(".save").addEventListener("click", ()=>{
        saveNote();
    })
    note.querySelector(".trash").addEventListener("click", ()=>{
        note.remove();
        saveNote()
    })
    // Auto save-------
    note.querySelector("textarea").addEventListener("focusout",()=>
        saveNote()
    )
    
    main.appendChild(note)
    saveNote()
}

// to retrive data from local host

(() =>{
    const lsNotes = JSON.parse(localStorage.getItem("notes"))
    if(lsNotes === null){
        addnote()
    }
    else{
        lsNotes.forEach((item)=>{
            addnote(item)
        })
    }
})()