document.addEventListener('DOMContentLoaded', () => {
      const tabButtons = document.querySelectorAll('.tab-button');
      const contentDiv = document.getElementById('content');

      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          const tabName = button.getAttribute('data-tab');
          fetch(`${tabName}.html`)
            .then(response => response.text())
            .then(html => {
              contentDiv.innerHTML = html;
              if (tabName === 'resident-info') {
                calculateAge('01/01/1980');
              }
            })
            .catch(error => console.error('Error loading content:', error));
        });
      });

      // Load the default tab content on page load
      const defaultTab = document.querySelector('.tab-button.active');
      if (defaultTab) {
        defaultTab.click();
      }
    });

    function calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      document.getElementById('age').textContent = `(${age} years old)`;
    }
