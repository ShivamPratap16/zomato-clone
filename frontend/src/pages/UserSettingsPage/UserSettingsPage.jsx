import React, { useState } from "react";
import axios from "axios";
import css from "./UserSettingsPage.module.css";

import Navbar from "../../components/Navbars/NavigationBar2/NavigationBar2";
import Footer from "../../components/Footer/Footer";
import NotificationSettingsUtil from "../../utils/UserProfileUtils/NotificationSettingsUtil/NotificationSettingsUtil";

const UserSettingsPage = () => {
  const [data, setData] = useState([
    {
      id: 1,
      txt: "Enable all",
      tag: "Activate all notifications",
      push: true,
      email: false,
      whatsapp: false,
    },
    {
      id: 2,
      txt: "Newsletters",
      tag: "Receive newsletter to stay up-to-date with whats brewing in food industry",
      push: true,
      email: false,
      whatsapp: false,
    },
    {
      id: 3,
      txt: "Promos and offers",
      tag: "Receive updates about coupons, promotions and money-saving offers",
      push: true,
      email: false,
      whatsapp: false,
    },
    {
      id: 4,
      txt: "Social notifications",
      tag: "Get notified when someone follows your profile, or when you get likes and comments on reviews and photos posted by you",
      push: true,
      email: false,
      whatsapp: false,
    },
    {
      id: 5,
      txt: "Important updates",
      tag: "Receive important updates related to your account",
      push: true,
      email: false,
      whatsapp: false,
    },
  ]);

  const handleToggle = (id, type) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [type]: !item[type] } : item
      )
    );
  };

  const savePreferences = async () => {
    try {
        await axios.post("http://localhost:4000/api/notifications/preferences", { data }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
      alert("Preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Failed to save preferences.");
    }
  };

  return (
    <div className={css.outerDiv}>
      <Navbar />
      <div className={css.container}>
        {/* Sidebar */}
        <div className={css.sidebar}>
          <div className={css.sidebarItem}>Notifications</div>
          <div className={css.sidebarItem}>Privacy & Security</div>
        </div>

        {/* Main Content */}
        <div className={css.content}>
          <div className={css.bdy}>
            <div className={css.header}>
              <div className={css.LHeader}>
                <div className={css.ttl}>Notification Preferences</div>
                <div className={css.tag}>
                  Receive updates related to order status, promo codes and more
                </div>
              </div>
              <div className={css.RHeader}>
                <button className={css.saveBtn} onClick={savePreferences}>
                  Save
                </button>
              </div>
            </div>
            <div className={css.settingsBdy}>
              <div className={css.checkBoxesTtl}>
                <div className={css.chbkTtl}>Push</div>
                <div className={css.chbkTtl}>Email</div>
                <div className={css.chbkTtl}>Whatsapp</div>
              </div>
              {data?.map((item) => (
                <div key={item.id}>
                  <NotificationSettingsUtil
                    txt={item.txt}
                    tag={item.tag}
                    push={item.push}
                    email={item.email}
                    whatsapp={item.whatsapp}
                    onToggle={(type) => handleToggle(item.id, type)}
                  />
                  {data?.length - 1 !== item.id ? (
                    <hr className={css.hr} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettingsPage;
