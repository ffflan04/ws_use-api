const searchModule = (()=>{
    return {
        searchUserInfo: ()=>{
            const $input = document.getElementById('search')
            const $button = document.getElementById('search-btn')
            const $tbody = document.getElementById('users-list')
            $button.onclick = async()=>{
                const api_URL = 'http://localhost:3000/api/v1/search?q='
                const keyword = $input.value
                const res = await fetch(api_URL + keyword,{method: 'SEARCH'})
                const parsed = await res.json()
                if (parsed == false){ // ヒットするユーザーがいなかったときの処理。
                    while ($tbody.firstChild){
                        $tbody.removeChild($tbody.firstChild)
                    }
                    $tbody.textContent = '該当するユーザーはいません'
                }else{ // ヒットするユーザーがいたときの処理。
                    while ($tbody.firstChild){ // 子要素を全て削除する処理
                        $tbody.removeChild($tbody.firstChild)
                    }
                    for (let i=0;i<parsed.length;i++){
                        let values_Array = Object.values(parsed[i])
                        const $tr = document.createElement('tr')
                        values_Array.forEach((value)=>{
                            const $td = document.createElement('td')
                            $td.textContent = value
                            $tr.appendChild($td)
                        })
                        $tbody.appendChild($tr)
                    }
                }
            }
        }
    }
})()