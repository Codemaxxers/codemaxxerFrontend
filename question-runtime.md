---
toc: false
comments: true
layout: base
title: Question Runtime
author: Rachit
permalink: /qrt
---

# Question Runtime
<button id="fetchButton">Fetch Data</button>
<div id="result"></div>

<script>
    document.getElementById('fetchButton').addEventListener('click', function() {
        const baseURL = "https://codemaxxers.stu.nighthawkcodingsociety.com/api/questions/course";
        const course = "csa"; // Replace with the actual course value
        const url = `${baseURL}/${course}`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('result').textContent = 'Error: ' + error.message;
        });
    });
</script>





