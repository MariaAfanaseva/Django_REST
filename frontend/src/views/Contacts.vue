<template>
    <div class="content">
        <div class="contacts_block">
            <h1>Contacts</h1>
            <h2>Write us</h2>
            <div v-if="!isSent">
              <div v-if="contactFormErrors">
                <div class="error" v-for="(err_list, index) in contactFormErrors"
                   :key="index">
                  <p class="error" v-for="(text, index) in err_list"
                   :key="index">
                   {{text}}
                 </p>
                </div>
              </div>
              <form
                id="contacts"
                @submit.prevent="submit"
                method="post"
              >
                <input class="contacts_input"
                       required
                       id="name"
                       v-model="name"
                       type="text"
                       name="name"
                       placeholder="Name"><br>
                <input class="contacts_input"
                       required
                       id="email"
                       v-model="email"
                       type="email"
                       name="email"
                       placeholder="Email"><br>
                <input class="contacts_input"
                       required
                       id="phone"
                       v-model="phone"
                       type="tel"
                       name="phone"
                       placeholder="Phone number"><br>
                <select class="contacts_input"
                        required
                        id="cause"
                        v-model="cause"
                        name="cause"
                >
                    <option value="Suggestion for improvement">
                        Suggestion for improvement
                    </option>
                    <option value="Thanks">Thanks</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Other">Other</option>
                </select><br>
                <textarea class="contacts_textarea"
                          required
                          id="message"
                          v-model="message"
                          name="message"
                          placeholder="Your message"></textarea><br>
                <button class="contacts_button" type="reset">Delete</button>
                <button class="contacts_button" type="submit">Send</button>
              </form>
            </div>
            <p v-else>Thank you. We will contact you shortly. Your message ID: {{ messageId }}.</p>
            <h2>Address</h2>
                <p>Our phone: 8 (800) 555-55-55</p>
                <p>Our email: BikeStore@gmail.com</p>
                <p>Our address: Moscow, Academician Korolev street 12</p>
                <div id="contacts_map" class="map"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      name: null,
      email: null,
      phone: null,
      cause: null,
      message: null,
    };
  },

  computed: {
    ...mapGetters(['isSent', 'contactFormErrors', 'messageId']),
  },

  methods: {
    ...mapActions(['sendContactForm']),

    submit() {
      const {
        name, email, phone, cause, message,
      } = this;
      this.sendContactForm({
        name, email, phone, cause, message,
      });
    },
  },

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
