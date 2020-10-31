<template>
    <div class="content">
        <div class="contacts_block">
            <h1>Contacts</h1>
            <h2>Write us</h2>
                <form action="URL">
                    <input class="contacts_input" type="text" placeholder="Имя"><br>
                    <input class="contacts_input" type="email" placeholder="Email"><br>
                    <input class="contacts_input" type="tel" placeholder="Tелефон"><br>
                    <select class="contacts_input">
                        <option value="suggestion for improvement">
                            Suggestion for improvement
                        </option>
                        <option value="thanks">Thanks</option>
                        <option value="complaint">Complaint</option>
                        <option value="other">Other</option>
                    </select><br>
                    <textarea class="contacts_textarea" placeholder="Ваше сообщение"></textarea><br>
                    <button class="contacts_button" type="reset">Delete</button>
                    <button class="contacts_button" type="submit">Send</button>
                </form>
            <h2>Address</h2>
                <p>Our phone: 8 (800) 555-55-55</p>
                <p>Our email: BikeStore@gmail.com</p>
                <p>Our address: Moscow, Academician Korolev street 12</p>
                <div id="contacts_map" class="map"></div>
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    const block = document.getElementById('contacts_map');
    const map = document.createElement('script');
    map.setAttribute('src', 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4c6c0a55c2339ff86f05a8e1d8d80e493ed089335c2b88565f992d2c03de201c&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true');
    map.type = 'text/javascript';
    map.async = true;
    block.appendChild(map);
  },
};
</script>
