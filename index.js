'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    console.log(responseJson.data.length);
    if (responseJson.data.length==0) {
        alert("No Results Found");
    }
    
    $('.error-message').empty();
    $('.results-list').empty();
  
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
    }
    $('.results').removeClass('hidden');
}


function getParks(baseUrl, stateArr, maxResults, apiKey) {
   
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }
   
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
   
    fetch(url)
    .then(response => {
        if (response.ok) {
            console.log("abc");
            console.log(response);
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    //
    // if (Array=0) {
    //     alert("error");
    // } 
    //
}


function watchForm() {
    $('.js-form').submit(event => {
        event.preventDefault();
        const baseUrl = 'https://developer.nps.gov/api/v1/parks'
        const stateArr = $('.js-state-entered').val().split(",");
        const maxResults = $('.js-result-amt').val();
        const apiKey = '5XeT6sKDaLzVpbWlq0mCnR4gwTpsKmkkij0TNCUo'
        getParks(baseUrl, stateArr, maxResults, apiKey);
    });
}

$(watchForm);

