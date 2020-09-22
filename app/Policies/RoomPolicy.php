<?php

namespace App\Policies;

use App\Room;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RoomPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  User  $user
     * @param  Room  $room
     * @return mixed
     */
    public function view(User $user,Room $room)
    {
        return $user->id == $room->user_id || $room->members->contains($user);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  User  $user
     * @param  Room  $room
     * @return mixed
     */
    public function update(User $user, Room $room)
    {
        return $user->id === (int) $room->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  User  $user
     * @param  Room  $room
     * @return mixed
     */
    public function delete(User $user, Room $room)
    {
        return $user->id === (int) $room->user_id;
    }

    public function invite(User $owner,Room $room,User $user) {
        return ($owner->id == $room->user_id) && (!$room->members->contains($user) && $room->user_id != $user->id);
    }

    public function remove_member(User $owner, Room $room, User $user)
    {
        return ($owner->id == $room->user_id) && ($room->members->contains($user) && $room->user_id != $user->id);
    }
}
